import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getUserToken();
    if(token) {
      const authReq = req.clone({setHeaders:{"Authorization":"Bearer " + token}});
      console.log('authReq', authReq)
      return next(authReq);
    }
    return next(req);
};

const getUserToken = () => {
  const hdepot = localStorage.getItem('hdepot');
  let token = null;

  if(hdepot) {
    token = JSON.parse(hdepot)?.user?.token;
  }

  return token;
}
