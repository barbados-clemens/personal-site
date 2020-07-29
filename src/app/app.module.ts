import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {LayoutModule} from './layout/layout.module';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TooltipModule} from './tooltip/tooltip.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ErrorHandlerService} from './error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ScullyLibModule,
    HttpClientModule,
    LayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    TooltipModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
    AngularFirestoreModule,
  ],
  providers: [{provide: ErrorHandler, useClass: ErrorHandlerService}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
