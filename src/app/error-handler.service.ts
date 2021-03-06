import {ErrorHandler, Injectable} from '@angular/core';
import {captureException, captureMessage, init, Severity} from '@sentry/browser';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {

  constructor() {
    init({
      dsn: environment.sentry.dns,
      environment: environment.sentry.envName,
    });
  }

  static sendToSentry(msg: string, level?: Severity): void {
    captureMessage(msg, level ?? Severity.Info);
  }

  handleError(error: any): void {
    // console.error(error);
    captureException(error);
    console.warn('error captured by sentry', error);
  }
}
