import { inLoginRoute, redirectToLoginPage } from "../helpers/requestHelper.js";
import { AUTH_TOKEN, NOT_AUTHENTICATED, VALIDATION_ERRORS } from "./constants.js";

const axiosInstance = axios.create({
    "baseURL": "https://api.spotkradmin.online",
    "headers": {
        "Authorization": `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
    }
})

axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {

    const statusCode = error.response.data.code;

    
    console.log(inLoginRoute())

    if(statusCode == NOT_AUTHENTICATED && ! inLoginRoute())
    {
      window.location.replace('login.html')
    }

    if(statusCode == VALIDATION_ERRORS)
    {
      let errors = error.response.data.data;
      let firstKey = Object.keys(errors)[0]
      alert(`${firstKey} : ${errors[firstKey]}`)
    }

    
    
    return Promise.reject(error);
  });

export default axiosInstance;