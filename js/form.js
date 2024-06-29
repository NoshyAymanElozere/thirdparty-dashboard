import axiosInstance from "../api/axiosInterceptor.js";
import { AUTH_TOKEN, LOCAL_STORAGE_PROFILE_KEY } from "../api/constants.js";
import { redirectToHome, redirectToLoginPage, userLoggedIn } from "../helpers/requestHelper.js";

let phoneNamber = document.querySelector(".phoneNamber");
let passwordnum = document.querySelector(".passwordnum");
let sumtBtn = document.getElementById("sumtBtn");

sumtBtn.addEventListener("click", function (event) {
  event.preventDefault();
  
  const payload = {
    phone: phoneNamber.value,
    password: passwordnum.value,
  };

  axiosInstance.post('/auth/login/dashboard', payload)
    .then(function (response) {
      let token = response.data.data.token;
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(response.data.data));
      localStorage.setItem(AUTH_TOKEN, token);
      
      redirectToLoginPage()
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
});

window.addEventListener("load", function(){
  if(userLoggedIn())
  {
    redirectToHome()
  }
});
