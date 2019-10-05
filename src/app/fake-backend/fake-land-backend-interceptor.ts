import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeLandBackendInterceptor implements HttpInterceptor {
   
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
                case url.endsWith('/lands') && method === 'GET':
                    return getLands();
                case url.match('/land') && method === 'PATCH':
                    return changeLandName();
                case url.match('/land') && method === 'POST':
                    return addLand();
                case url.match('/land') && method === 'DELETE':
                    return deleteLand();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }
    
        // route functions
        function getLands() {
            let lands = JSON.parse(localStorage.getItem("lands") || "[]");
            return ok(lands);
        }

        function addLand(){
            const landBody = body
            let lands = JSON.parse(localStorage.getItem("lands") || "[]");
            lands.push(landBody)
            localStorage.setItem("lands", JSON.stringify(lands));
            return ok();
        }

        function deleteLand(){
            const landId = body
            let lands = JSON.parse(localStorage.getItem("lands") || "[]");
            let objIndex = lands.findIndex((obj => obj.id == landId.landId));
            lands.splice(objIndex, 1);
            localStorage.setItem("lands", JSON.stringify(lands));
            return ok();
        }

        function changeLandName() {
            const landBody = body
            let lands = JSON.parse(localStorage.getItem("lands") || "[]");
            
            let objIndex = lands.findIndex((obj => obj.id == landBody.landId));

            lands[objIndex].landName = landBody.landName;
            localStorage.setItem("lands", JSON.stringify(lands));
            return ok();
        }
    
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeLandBackendInterceptor,
    multi: true
};