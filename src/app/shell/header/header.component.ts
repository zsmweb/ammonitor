import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngxs/store';
import { Logout } from '@app/auth/state/auth.actions';
import { AuthState } from '@app/auth/state/auth.state';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;

  username$ = this.store.select(AuthState.username);
  constructor(private store: Store, private titleService: Title) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(new Logout()).subscribe((ob) => {
      this.store.dispatch(new Navigate(['/login']));
    });
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
