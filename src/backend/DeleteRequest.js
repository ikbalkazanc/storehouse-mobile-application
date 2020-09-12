
import { _Company } from '../model/company'
import { Product } from '../model/product'



export function deleteProduct(api,  company_id, qr, callback) {
    var request = {
        method: 'DELETE',
        headers: {
            'Host': 'autostorehouse.azurewebsites.net'
        },

    };
    var url = 'https://autostorehouse.azurewebsites.net/api/product/delete/' + api + '/' + company_id + '/' + qr;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.admission == true) {
                console.log(data)
                Product.admission = true
            }
            else {
                Product.admission = false;
                Product.error = data.error;
            }
            callback()
        })
        .catch((error) => {
            console.error(error);
        });
}