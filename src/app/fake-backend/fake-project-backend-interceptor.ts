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
            .pipe(delay(50))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/projects') && method === 'GET':
                    return getProjects();
                case url.match('/project') && method === 'PATCH':
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
    
        function getProjects() {
            let projects = JSON.parse(localStorage.getItem("projects") || "[]");
            return ok(projects);
        }

        function changeProjectName() {
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
            const projectId = body
            let projects = JSON.parse(localStorage.getItem("projects") || "[]");
            let objIndex = projects.findIndex((obj => obj.id == projectId.projectId));
            projects.splice(objIndex, 1);
            localStorage.setItem("projects", JSON.stringify(projects));
            return ok();
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }
    }
}

export const fakeProjectBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeProjectBackendInterceptor,
    multi: true
};