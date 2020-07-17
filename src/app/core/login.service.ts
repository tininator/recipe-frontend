import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    protected keycloakAngular: KeycloakService) { }

  public logOut(): void {
    this.keycloakAngular.logout();
  }

  /* public isAdmin(): boolean {
    return this.keycloakAngular.getUserRoles().find(userRole => {
      userRole === "admin" ? true : false
    }) ? true : false;
  } */

  public getUserInfos(): Promise<Keycloak.KeycloakProfile> {
    return this.keycloakAngular.loadUserProfile();
  }

  public logIn(): void {
    this.keycloakAngular.login();
  }

  public isLoggedIn(): Promise<boolean> {
    return this.keycloakAngular.isLoggedIn();
  }
}
