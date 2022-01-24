import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;
  loading = false;
  emailAddress: string | undefined;

  destroy$ = new Subject<void>();

  constructor(private authService: AuthServiceService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const { email, password } = form.value;

    this.authService.register(email, password).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.loading = false;
      const token = data.user.accessToken;
      localStorage.setItem('accessToken', token);
      this.router.navigate(['dashboard']);
      this.message.success('You are welcome!')
    }, error => {
      this.loading = false;
      this.message.error(error.message)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
