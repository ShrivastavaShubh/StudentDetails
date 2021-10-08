import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  index=new Subject<any>();
  uid=new Subject<any>();
baseUrl='http://13.127.90.176:3131/api/v1/';
  constructor(public http:HttpClient) { }
  postUser(subUrl: string, data: any): Promise<any>
  { 
return new Promise((resolve, reject) =>{
  const request: string = this.baseUrl + subUrl;
  this.http.post(request, data)
  .subscribe(
    res => resolve(res),
    error => {
      if(error.status === 401){
       console.log("error",error.status) ;
       }
      reject(error);
    }
  );
});
}

getData(subUrl: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const request: string = this.baseUrl + subUrl;
    this.http
      .get(request)
        .subscribe(
          data => resolve(data),
          error =>{
            if(error.status === 401){
              console.log("error",error.status); 
             }
            reject(error)
          }
        );
  });
}

}
