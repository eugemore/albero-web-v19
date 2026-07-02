import {
  ApplicationConfig,
  LOCALE_ID,
  inject,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { routes } from './app.routes';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { environment } from '../environments/environment';

registerLocaleData(localeIt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
    ),

    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),

    provideAnimations(),

    importProvidersFrom(MatLuxonDateModule),

    { provide: LOCALE_ID, useValue: 'it' },
    { provide: MAT_DATE_LOCALE, useValue: 'it' },

    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({ uri: `${environment.api}/graphql` }),
        cache: new InMemoryCache(),
      };
    }),
  ],
};