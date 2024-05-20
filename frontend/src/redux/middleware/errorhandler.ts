import {isRejectedWithValue} from '@reduxjs/toolkit';
import type {Middleware} from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorHandler: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    // if (action.payload.status == 401 && getCookie("id_1")) {
    //   Console.error("middleware", action);
    //   Swal.fire({
    //     title: "Your session has expired you are required to login again ",
    //     icon: "info",
    //     confirmButtonColor: "#003399",
    //     allowOutsideClick: false,
    //   })
    //     .then(() => {
    //       deleteCookie("id_1");
    //       window.location.replace("/auth");
    //     })
    //     .catch(() => {
    //       deleteCookie("id_1");
    //       window.location.replace("/auth");
    //     });
    // }
  }

  // Console.error("middleware", action);
  return next(action);
};
