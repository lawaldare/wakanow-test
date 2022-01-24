import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthServiceService } from './auth/auth-service.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  destroy$ = new Subject<void>();

  constructor(public auth: AuthServiceService, private router: Router, private message: NzMessageService) {

  }

  logout() {
    this.auth.logout().pipe(takeUntil(this.destroy$)).subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    }, error => {
      this.message.error('An error occurred')
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.complete();
    this.destroy$.next();
  }
}
