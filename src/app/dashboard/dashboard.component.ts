import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NgForm } from '@angular/forms';

export interface User {
  id: number;
  email: string;
  first_name: string;
  avatar: string;
  last_name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();
  users: User[] = [];
  isVisible = false;

  firstName: string = ""
  lastName: string = ""
  email: string = ""
  id: any;


  isUserVisible = false;

  firstUserName: string = ""
  lastUserName: string = ""
  userEmail: string = ""



  constructor(private userService: UserService, private message: NzMessageService, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.users = data.data;
    }, error => {
      this.message.error('An error occurred!')
    })
  }

  editUser(user: User) {
    this.isVisible = true;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    this.id = user.id
  }

  addUser() {
    this.isUserVisible = true;
  }

  handleOk() {
    let payload: any = {};
    payload.first_name = this.firstName;
    payload.last_name = this.lastName;
    payload.email = this.email;
    this.userService.updateUserById(this.id, payload).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.notification.success('User updated successfully', "");
      this.isVisible = false;
    }, error => {
      this.message.error('An error occurred!')
    })
  }

  handleCancel() {
    this.isVisible = false;
  }


  handleUserOk() {
    let payload: any = {};
    payload.first_name = this.firstUserName;
    payload.last_name = this.lastUserName;
    payload.email = this.userEmail;
    this.userService.createUser(payload).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.notification.success('User created successfully', "");
      this.isUserVisible = false;
    }, error => {
      this.message.error('An error occurred!')
    })
  }

  handleUserCancel() {
    this.isUserVisible = false;
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.notification.success('User deleted successfully', "");
    }, error => {
      this.message.error('An error occurred!')
    })
  }





  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next();
    this.destroy$.complete();
  }

}
