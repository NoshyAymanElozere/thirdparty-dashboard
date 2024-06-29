import { changePassword, fetchProfileData, logoutUser, updateProfile } from '../api/auth.js';
import { LOCAL_STORAGE_PROFILE_KEY } from '../api/constants.js';
import { redirectToLoginPage } from '../helpers/requestHelper.js';

let accInfo = document.querySelector(".accInfo");
let updateProfileButton = document.getElementById('update-profile-button');

function syncProfileData(profileData) {
  localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
  accInfo.innerHTML = `<img src="${profileData.avatar}" alt=""  id="userInfo"/>
  <div class="aIn">
    <span>${profileData.name}</span>
    <span>${profileData.username}</span>
  </div>`
  
  localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(profileData))
  
  const allowedInputs = ['name', 'phone', 'username'];

  allowedInputs.forEach((input) => {
    document.getElementById(`${input}_value`).value = `${profileData[input]}`
  })
}


window.addEventListener("load", updateLocalStorageProfile());


async function updateLocalStorageProfile()
{
  const profileData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY));
  const profileExistsInLocalStorage = !! profileData;

  const response = ! profileExistsInLocalStorage ? await fetchProfileData() : profileData;

  syncProfileData(! profileExistsInLocalStorage ? response : profileData)
}

const LogoutButton = document.getElementById('logout-button');

LogoutButton.addEventListener('click', function(){
  logout()
})

function logout()
{
  logoutUser();

  localStorage.clear();
  redirectToLoginPage()
}



// Change password

const changePasswordButton = document.getElementById('change-password-button')

changePasswordButton.addEventListener('click', function(event){
  event.preventDefault()
  
  const form = document.getElementById('change-password-form');
  let formData = new FormData(form)
  
  formData = Object.fromEntries(formData.entries());

  if(formData.new_password != formData.new_password_confirmation)
  {
    console.log('two passwords does not match !');
    return;
  }

  changePassword(formData).then(function(res){
    console.log('result', res)
  });
})

updateProfileButton.addEventListener('click', function(event){
  event.preventDefault()
  
  updateProfileButton.disabled = true;
  
  const oldColor = updateProfileButton.style.background;
  updateProfileButton.style.background = '#ddd';

  const form = document.getElementById('update-profile-form');

  console.log(form);
  const formData = new FormData(form);

  updateProfile(formData).then(function(){
      localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY)
      updateLocalStorageProfile()

      updateProfileButton.disabled = false;
      updateProfileButton.style.background = oldColor;
  })
  
})