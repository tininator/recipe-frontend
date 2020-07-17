import { KeycloakService } from 'keycloak-angular';

import { environment } from './environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          loadUserProfileAtStartUp: true,
          config: environment.keycloak,
          initOptions: {
            checkLoginIframe: false,
          },
          bearerExcludedUrls: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
