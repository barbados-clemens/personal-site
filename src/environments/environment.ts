// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sentry: {
    envName: 'dev',
    dns: 'https://2e9f90c609db4788b4fe4b647e15e83c@sentry.io/1723422',
  },
  algolia: {
    apiKey: '715e2f2e918e2d13a8e24904388c7798',
    apiId: 'EX7MUSC1F5',
  },
  firebaseConfig: {
    apiKey: 'AIzaSyC0CexIiWvUUArBN1Qwk0YLTrzxQ01LKAI',
    authDomain: 'portfolio-82e83.firebaseapp.com',
    databaseURL: 'https://portfolio-82e83.firebaseio.com',
    projectId: 'portfolio-82e83',
    storageBucket: 'portfolio-82e83.appspot.com',
    messagingSenderId: '1053843841056',
    appId: '1:1053843841056:web:4abbdf8b7fd00a72',
    measurementId: 'G-VTTCM2HFS9',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
