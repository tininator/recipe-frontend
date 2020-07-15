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

  constructor(
    private readonly loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.getUserInfos().then((profile: Keycloak.KeycloakProfile) => {
      this.firstname = profile.firstName;
      this.lastname = profile.lastName;
    }).catch(error => console.log(error));
  }

  public logout(): void {
    this.loginService.logOut();
  }
}
