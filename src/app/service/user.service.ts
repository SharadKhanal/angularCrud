import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponseModel } from '../user-response-model.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  upadateUsers(arg0: any) {
    throw new Error('Method not implemented.');
  }

  apiUrlEndPoint:string='api/users';
  baseUrl:string=environment.baseUrl

  constructor(
    private httpClient:HttpClient
  ) { }

  addUsers(user:any): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl.concat(this.apiUrlEndPoint),user);
  }

  listAllUsers(): Observable<UserResponseModel>{
    return this.httpClient.get<UserResponseModel>(this.baseUrl.concat(this.apiUrlEndPoint));
  }
  viewUsersById(id:number):Observable<UserResponseModel>{
    return this.httpClient.get<UserResponseModel>(this.baseUrl.concat(this.apiUrlEndPoint)+"/"+id);

  }

  deleteData(id:any): Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl.concat(this.apiUrlEndPoint)+"/"+id);
  }

  updateUsers(id:any,user:any):Observable<UserResponseModel>{
    return this.httpClient.put<UserResponseModel>(this.baseUrl.concat(this.apiUrlEndPoint+"/"+id),user);
  }

}
 