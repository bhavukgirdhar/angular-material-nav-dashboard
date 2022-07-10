import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = localStorage.getItem('authToken');
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken,
                'Content-Type': 'application/json'
            }
        });
        return next.handle(req);
    }
}