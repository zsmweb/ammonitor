import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, tap, filter, takeUntil, take, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';
import { Select, Store, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SubmitLoginForm } from './state/login.actions';
import { Navigate } from '@ngxs/router-plugin';
import { AuthState } from './state/auth.state';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  auth$ = this.store.select(AuthState.isAuthenticated);

  constructor(private formBuilder: FormBuilder, private store: Store, private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.auth$.forEach((auth) => {
      if (auth) {
        this.store.dispatch(new Navigate([this.route.snapshot.queryParams.redirect || '/']));
      }
    });
  }

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    this.store.dispatch(new SubmitLoginForm()).subscribe((res) => {
      this.isLoading = false;
    });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
