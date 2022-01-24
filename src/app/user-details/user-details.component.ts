import { User } from './../dashboard/dashboard.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private userService: UserService, private message: NzMessageService) { }

  user: User | undefined;
  name: string = "";
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      this.getUserDetail(id);
    })
  }


  getUserDetail(id: any) {
    this.userService.getUserById(id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.user = data.data;
      this.name = `${data.data.first_name} ${data.data.last_name}`;
    }, error => {
      this.message.error(error.message)
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next();
    this.destroy$.complete();
  }

}
