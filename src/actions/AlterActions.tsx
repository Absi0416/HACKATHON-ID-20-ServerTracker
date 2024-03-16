import { alertConstants } from '../constants/alterConstats';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

const alertSubject = new Subject();
const defaultId = 'default-alert';
export const alertService = {
  success,
  error,
  clear
};

/* // enable subscribing to alerts observable
function onAlert(id = defaultId) {
  return alertSubject.asObservable().pipe((x: { id: string; }) => x && x.id === id);
} */

// convenience methods
function success(message: any, options: any) {
  alert({ ...options, type: alertConstants.SUCCESS, message });
}

function error(message: any,options: any) {
  alert({ ...options, type: alertConstants.SUCCESS, message });
}

function clear() {
  return {type: alertConstants.CLEAR};
}

function alert(alert: any) {
  alert.id = alert.id || defaultId;
  console.log("success alert");
  alertSubject.next("success alert");
}