import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string | undefined;
  password: string | undefined;
  loading = false;
  emailAddress: string | undefined;

  destroy$ = new Subject<void>();

  constructor(private authService: AuthServiceService, private message: NzMessageService, private router: Router, private notification: NzNotificationService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const { email, password } = form.value;

    this.authService.login(email, password).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loading = false;
      const token = data.user.accessToken;
      localStorage.setItem('accessToken', token);
      this.router.navigate(['dashboard']);
      this.notification.success('Welcome back!!!', "");
    }, error => {
      this.loading = false;
      this.message.error(error.message)
    })
    console.log(form.value)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
