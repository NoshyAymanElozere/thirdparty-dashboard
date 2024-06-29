import axiosInstance from "./axiosInterceptor.js";

export async function fetchProfileData()
{
   const response = await axiosInstance.get('/auth/profile')

   return response.data.data;
}

export function updateProfile(data)
{
    return axiosInstance.postForm('/auth/profile', data)
}

export function logoutUser()
{
    return axiosInstance.post('/auth/logout')
}

export function changePassword(data)
{
    return axiosInstance.put('/auth/password/change_password', data);
}