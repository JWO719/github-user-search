import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { UserSearchModule } from './user-search.module';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from './models/user-response';

@Injectable({
  providedIn: UserSearchModule
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  public fetchUsers(query: string, page = 0): Observable<UserResponse> {
    return this.httpClient
      .get<UserResponse>(`${environment.userServiceUrl}?q=${query}&page=${page}&per_page=${this.defaultPageItems}`)
      .pipe(catchError(_ => []));
  }

  public get defaultPageItems(): number {
    return 30;
  }
}
