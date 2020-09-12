import { _Company} from '../model/company'
import { Product } from '../model/product'
import { Order } from '../model/order'
import { Password } from '../model/password'


export function insertOrder(api, callback) {
    var request = {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json',
            'Host': 'autostorehouse.azurewebsites.net'
        },
        body: JSON.stringify(Order)

    };
    debugger
    var url = 'https://autostorehouse.azurewebsites.net/api/order/insert/' + api;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.admission == true) {
                Order.admission = true
            }
            else {
                Order.error = data.error
                Order.admission = false
            }
            callback()
        })
        .catch((error) => {
            console.error(error);
        });
}

export function updatePassword(mail, oldpassword, newpassword, callback) {
    var request = {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json',
            'Host': 'autostorehouse.azurewebsites.net'
        },
        body: JSON.stringify(Order)

    };
    debugger
    var url = 'https://autostorehouse.azurewebsites.net/api/security/resetpassword/' + mail + '/' + oldpassword + '/' + newpassword;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.admission == true) {
                Password.admissinon = true;
            }
            else {
                Password.error = data.error;
                Password.admissinon = data.admission;
            }
            callback()
        })
        .catch((error) => {
            console.error(error);
        });
}



export function insertProduct(api, mail, company_id, callback) {
    var request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Host': 'autostorehouse.azurewebsites.net'
        },
        body: JSON.stringify(Product)

    };
    var url = 'https://autostorehouse.azurewebsites.net/api/product/insert/' + api + '/' + mail + '/' + company_id;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.admission == true) {
                Product.admission = true
            }
            else {
                Product.error = data.error
                Product.admission = data.admission
            }
            callback()
        })
        .catch((error) => {
            console.error(error);
        });
}