import { UsersService } from './users.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSearchRoutingModule } from './user-search-routing.module';
import { UserSearchComponent } from './user-search.component';
import { MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UserItemComponent } from './user-item/user-item.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [UserSearchComponent, UserItemComponent, PaginationComponent],
  imports: [
    CommonModule,
    UserSearchRoutingModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [UsersService]
})
export class UserSearchModule {}
