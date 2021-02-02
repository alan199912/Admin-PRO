import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

import { ModalImgService } from 'src/app/services/modal-img.service';
import { SearcherService } from 'src/app/services/searcher.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number;
  public users: Array<User>;
  public usersTemp: Array<User>;
  public pagination: number = 0;
  public loading: boolean;
  public imgSubscription: Subscription;

  constructor(
    private userService: UserService,
    private searcherService: SearcherService,
    private modalImgService: ModalImgService
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.imgSubscription = this.modalImgService.newImg
      .pipe(delay(500))
      .subscribe((img) => {
        this.getUsers();
      });
  }

  getUsers() {
    this.loading = true;
    return this.userService
      .getUsers(this.pagination)
      .subscribe(({ totalRecord, users }) => {
        this.totalUsers = totalRecord;
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      });
  }

  changePagination(next: number) {
    this.pagination += next;

    if (this.pagination < 0) {
      this.pagination = 0;
    } else if (this.pagination >= this.totalUsers) {
      this.pagination -= next;
    }

    this.getUsers();
  }

  search(searchTerm: string) {
    if (searchTerm.length === 0) {
      return (this.users = this.usersTemp);
    }

    this.searcherService
      .search('users', searchTerm)
      .subscribe((res: Array<User>) => {
        this.users = res;
      });
  }

  deleteUser(user: User) {
    if (user.id === this.userService.uid) {
      return Swal.fire('Error', 'Dont delete yourself', 'error');
    }

    Swal.fire({
      title: 'Delete User?',
      text: `Is about to delete the user ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((res) => {
          Swal.fire('Deleted!', `${user.name} has been deleted.`, 'success');
          this.getUsers();
        });
      }
    });
  }

  changeRole(user: User) {
    this.userService.updateUser(user).subscribe((data) => console.log(data));
  }

  openModal(user: User) {
    this.modalImgService.openModal('users', user.id, user.img);
  }

  ngOnDestroy() {
    this.imgSubscription.unsubscribe();
  }
}
