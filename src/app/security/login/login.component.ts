import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login() {
    this.authService.login(this.loginForm.value.email,
                           this.loginForm.value.password)
                    .subscribe(() => this.notificationService.notify(`Bem vindo, ${this.authService.jwtPayload.name}`),
                                response => this.notificationService.notify(response),
                                () => {
                                  this.router.navigate([atob(this.navigateTo)]);
                                });
  }

}
