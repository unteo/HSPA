import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AlertifyService } from "./alertify.service";
import { Observable, of, throwError } from "rxjs";
import { catchError, concatMap, retryWhen } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ErrorCode } from "src/app/enums/enums";

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private alertyfy: AlertifyService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler)
  {
    console.log('HTTP Request started');
    return next.handle(request)
    .pipe(retryWhen( error => this.retryRequest(error, 10)),catchError((error: HttpErrorResponse)=>{
            const errorMessage = this.setError(error);
            console.log(error);
            this.alertyfy.error(errorMessage);
            return throwError(errorMessage);
          })
    );
  }

setError(error: HttpErrorResponse): string {
  let errorMessage = 'Unknown error ocured';
  if(error.error instanceof ErrorEvent) {
    //Client side error
    errorMessage = error.error.message;
  } else{
    // server side error
    if(error.status!==0){
    errorMessage = error.error.errorMessage;
    }
  }
  return errorMessage;
}

// Retry the request in case of error
retryRequest(error: Observable<unknown>, retryCount: number): Observable<unknown>
{
  return  error.pipe(
          concatMap((checkErr: HttpErrorResponse, count: number) =>{
            if(count<=retryCount)
            {
              switch(checkErr.status)
              {
                case ErrorCode.serverDown :
                return of(checkErr);

                //case ErrorCode.unauthorised :
                  //return of(checkErr);
              }
            }
          })
        )
}
}
