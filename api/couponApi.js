import { stringifyPaginationParams } from "../js/pagination.js";
import axiosInstance from "./axiosInterceptor.js";

export function storeCoupon(data)
{
    return axiosInstance.post('/api/admin/coupons', data)
}

export function fetchAllCoupons(params)
{
    return axiosInstance.get(`/api/admin/coupons?${stringifyPaginationParams()}`);
}

export function deleteCoupon(id)
{
    return axiosInstance.delete(`/api/admin/coupons/${id}`)
}