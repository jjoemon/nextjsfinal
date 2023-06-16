
// alert.service.js
// services
// Services handle all HTTP communication from the React front-end app
// to the Next.js back-end API, each service encapsulates the API calls
// for a content type (e.g. users) and exposes methods for performing
// various operations (e.g. CRUD operations). Services can also perform actions
// that don't involve HTTP requests, such as displaying and clearing alerts with the
// alert service.

import { BehaviorSubject } from 'rxjs';

const alertSubject = new BehaviorSubject(null);

export const alertService = {
    alert: alertSubject.asObservable(),
    success,
    error,
    clear
};

function success(message, showAfterRedirect = false) {
    alertSubject.next({
        type: 'alert-success',
        message,
        showAfterRedirect
    });
}

function error(message, showAfterRedirect = false) {
    alertSubject.next({
        type: 'alert-danger',
        message,
        showAfterRedirect
    });
}

// clear alerts
function clear() {
    // if showAfterRedirect flag is true the alert is not cleared
    // for one route change (e.g. after successful registration)
    let alert = alertSubject.value;
    if (alert?.showAfterRedirect) {
        alert.showAfterRedirect = false;
    } else {
        alert = null;
    }
    alertSubject.next(alert);
}
