import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeProjectBackendInterceptor implements HttpInterceptor {
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                // case url.endsWith('/users/register') && method === 'POST':
                //     return register();
                // case url.endsWith('/users/authenticate') && method === 'POST':
                //     return authenticate();
                case url.endsWith('/projects') && method === 'GET':
                    return getProjects();
                
                case url.match('/project') && method === 'PATCH':
                    return changeProjectNamePatch();

                case url.match('/project') && method === 'PUT':
                return changeProjectName();
                case url.match('/project') && method === 'POST':
                return addProject();
                case url.match('/project') && method === 'DELETE':
                    return deleteProject();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }
    
        // route functions
        function getProjects() {
            let projects = JSON.parse(localStorage.getItem("projects") || "[]");
            return ok(projects);
        }

        
        function changeProjectNamePatch() {
            const projectBody = body
            let projects = JSON.parse(localStorage.getItem("projects") || "[]");
            
            let objIndex = projects.findIndex((obj => obj.id == projectBody.projectId));

            projects[objIndex].projectName = projectBody.projectName;
            localStorage.setItem("projects", JSON.stringify(projects));
            return ok();
        }
        function addProject(){
            const projectBody = body
            let projects = JSON.parse(localStorage.getItem("projects") || "[]");
            projects.push(projectBody)
            localStorage.setItem("projects", JSON.stringify(projects));
            return ok(projectBody);
        }

        function deleteProject(){
            // const projectId = idFromUrl()
            // let projects = JSON.parse(localStorage.getItem("projects") || "[]");
            // let objIndex = projects.findIndex((obj => obj.id == projectId));
            // projects.splice(objIndex, 1);
            // localStorage.setItem("projects", JSON.stringify(projects));
            // return ok();
            const projectId = body
            let projects = JSON.parse(localStorage.getItem("projects") || "[]");
            let objIndex = projects.findIndex((obj => obj.id == projectId));
            projects.splice(objIndex, 1);
            localStorage.setItem("projects", JSON.stringify(projects));
            return ok();
        }

        function changeProjectName() {
            const projectBody = body
            let projects = JSON.parse(localStorage.getItem("projects") || "[]");
            
            let objIndex = projects.findIndex((obj => obj.id == projectBody.id));

            projects[objIndex].projectName = projectBody.projectName;
            localStorage.setItem("projects", JSON.stringify(projects));
            return ok();
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id == idFromUrl());
            return ok(user);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeProjectBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeProjectBackendInterceptor,
    multi: true
};