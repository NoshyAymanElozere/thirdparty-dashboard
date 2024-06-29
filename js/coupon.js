import { CREATED, OK } from "../api/constants.js";
import { deleteCoupon, fetchAllCoupons, storeCoupon } from "../api/couponApi.js";
import { convertDateTime } from "../helpers/dateHelper.js";

const storeButton = document.getElementById('store-coupon-button')

storeButton.addEventListener('click', function (event) {
    event.preventDefault();
    storeButton.disabled = true;
    const form = document.getElementById('store-coupon-form');
    let formData = new FormData(form);
    formData = Object.fromEntries(formData.entries());

    formData.valid_till = convertDateTime(formData.valid_till);
    formData.status = formData.status == 'on';

    storeCoupon(formData).then(function (res) {
        if (res.data.code == CREATED) {
            fetchCoupons()
        }

        storeButton.disabled = false;
    }).catch(() => storeButton.disabled = false)
})


function handleDelete(event) {
    event.preventDefault();

    let id = event.target.getAttribute('id_value')

    deleteCoupon(id).then(() => fetchCoupons())
}

async function fetchCoupons(params) {
    let tBody = document.querySelector('#coupon-table tbody')
    tBody.innerHTML = '';

    let allCoupons = await fetchAllCoupons(params)

    allCoupons.data.data.forEach((coupon) => {
        tBody.innerHTML += `<tr>
        <!-- <td><div class="smallBtn pinkBac m0a">On hold</div></td> -->
        <td alt="${coupon.id}" >${coupon.id}</td>
        <td  alt="${coupon.code}" class="mw200">${coupon.code}</td>
        <td alt="${coupon.discount}" >${coupon.discount}</td>
        <td alt="${coupon.number_of_users}" >${coupon.number_of_users}</td>
        <td alt="${coupon.used_by_users}" >${coupon.used_by_users}</td>
        <td alt="${coupon.valid_till}" >${coupon.valid_till}</td>
        <td alt="${coupon.created_at}" >${coupon.created_at}</td>
        <td class="tools">
            <img src="../media/icons/delete.png" alt="" id_value="${coupon.id}">
        </td>
      </tr>`
    })

    Array.from(document.querySelectorAll('[id_value]')).forEach((td) => {
        td.addEventListener('click', (e) => handleDelete(e))
    });
}

fetchCoupons()