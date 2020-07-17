import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public firstname: string;
  public lastname: string;

  public isLoggedIn: boolean;

  constructor(
    private readonly loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.isLoggedIn().then((value: boolean) => {
      this.isLoggedIn = value;
    }).catch(error => console.log(error));
    this.loginService.getUserInfos().then((profile: Keycloak.KeycloakProfile) => {
      this.firstname = profile.firstName;
      this.lastname = profile.lastName;
    }).catch(error => console.log(error));
  }

  public logout(): void {
    this.loginService.logOut();
  }

  public login(): void {
    this.loginService.logIn();
  }

  public toggle(): void {
    if (!this.isLoggedIn) {
      this.login();
    } else {
      this.logout();
    }
  }
}
