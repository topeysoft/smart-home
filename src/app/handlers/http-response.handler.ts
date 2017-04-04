import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
export class HttpResponseHandler {
   static extractData(res: Response) {
        let body = res.json() || {};
        return body;
    }
   static handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body: any = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}