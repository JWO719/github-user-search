import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, share, switchMap } from 'rxjs/operators';

import { User } from './models/user';
import { UserResponse } from './models/user-response';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  public userForm: FormGroup;

  public usersResponse$: Observable<UserResponse> = of(undefined);

  public users$: Observable<User[]> = of([]);

  public totalItems$: Observable<number> = of(1);

  public totalPages$: Observable<number> = of(1);
  public users: User[] = [];
  public page = 1;

  private pageSub = new BehaviorSubject(this.page);
  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      searchTerm: new FormControl('')
    });

    this.usersResponse$ = combineLatest(this.userForm.get('searchTerm').valueChanges.pipe(debounceTime(300)), this.page$).pipe(
      map(([searchTerm, page]) => {
        return { searchTerm, page };
      }),
      switchMap(({ searchTerm, page }) => this.userService.fetchUsers(searchTerm, page)),
      share()
    );
    this.totalItems$ = this.usersResponse$.pipe(map(userResponse => userResponse.total_count || 0));
    this.totalPages$ = this.totalItems$.pipe(map(totalItems => Math.ceil(totalItems / this.userService.defaultPageItems)));
    this.users$ = this.usersResponse$.pipe(map(userResponse => userResponse.items));
  }

  public clearFormControl(controlName: string): void {
    const controlMap = {};
    controlMap[controlName] = '';
    this.userForm.patchValue(controlMap);
  }

  public publishPageChage(page: number) {
    this.pageSub.next(page);
  }

  public get page$(): Observable<number> {
    return this.pageSub.asObservable();
  }
}
