import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn$: Observable<boolean> = this.loggedIn$$.asObservable();

  constructor(
    protected keycloakAngular: KeycloakService) {
      this.keycloakAngular.isLoggedIn().then((value: boolean) => {
        this.loggedIn$$.next(value);
      });
    }

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

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }
}
