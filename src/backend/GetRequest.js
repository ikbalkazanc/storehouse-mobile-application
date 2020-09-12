import { Auth, Info } from '../model/auth'
import { _Company } from '../model/company'
import { Product, ProductList } from '../model/product'


export function setUser(mail, password, callback) {
    var request = {
        method: 'GET',
        headers: {
            'Host': 'autostorehouse.azurewebsites.net'
        }
    };

    var url = 'https://autostorehouse.azurewebsites.net/api/security/login/' + mail + '/' + password;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.admission == true) {
                Auth.mail = data.AccountUser.mail;
                Auth.password = data.AccountUser.password;
                Auth.api_key = data.AccountUser.api_key;
                Auth.admission = data.admission;
                Auth.name = data.AccountUser.name;
                Auth.surname = data.AccountUser.surname;
                Auth.company_id = data.AccountUser.company_id;
                Auth.phone = data.AccountUser.phone;
                Auth.admission = true;
            }
            else {
                Auth.admission = false;
                Auth.error = data.error;
            }

            callback()
        })
        .catch((error) => {

            console.error(error);
        });
}
export function setCompany(api, mail, company_id, callback) {
    var request = {
        method: 'GET',
        headers: {
            'Host': 'autostorehouse.azurewebsites.net'
        }
    };
    var url = 'https://autostorehouse.azurewebsites.net/api/company/getprofile/' + api + '/' + mail + '/' + company_id;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.admission == true) {
                _Company.admission = true;
                _Company.mail = data.AccountCompany.mail;
                _Company.name = data.AccountCompany.name;
                _Company.id = data.AccountCompany.id;
                _Company.phone = data.AccountCompany.phone;

            }
            else {
                _Company.admission = false;
                _Company.error = data.error;
            }
            callback()
        })
        .catch((error) => {

            console.error(error);
        });
}

export function setInfo(api, mail, company_id, callback) {
    var request = {
        method: 'GET',
        headers: {
            'Host': 'autostorehouse.azurewebsites.net'
        }
    };

    var url = 'https://autostorehouse.azurewebsites.net/api/user/getinfo/' + api + '/' + mail + '/' + company_id;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {


            if (data.admission == true) {
                Info.productNumber = data.AccountInfo.productNumber;
                Info.totalproductNumber = data.AccountInfo.totalProductNumber;
                Info.userApiRequest = data.AccountInfo.userApiRequest;
                Info.admission = true;
            }
            else {
                Info.admission = false;
                Info.error = data.error;
            }

            callback()
        })
        .catch((error) => {

            console.error(error);
        });
}

export function setProduct(api, mail, company_id, qr, callback) {
    var request = {
        method: 'GET',
        headers: {
            'Host': 'autostorehouse.azurewebsites.net'
        }
    };
    var url = 'https://autostorehouse.azurewebsites.net/api/product/getproduct/' + api + '/' + mail + '/' + company_id + '/' + qr;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.admission == true) {
                Product.qr = data.Product.qr;
                Product.name = data.Product.name;
                Product.summary = data.Product.summary;
                Product.quantity = data.Product.quantity;
                Product.sold = data.Product.sold;
                Product.price = data.Product.price;
                Product.admission = true;
                Product.user_mail = data.Product.user_mail;
                Product.company_id = data.Product.company_id;
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

export function setProducts(api, mail, company_id, callback) {
    var request = {
        method: 'GET',
        headers: {
            'Host': 'autostorehouse.azurewebsites.net'
        }
    };
    var url = 'https://autostorehouse.azurewebsites.net/api/product/getlist/' + api + '/' + mail + '/' + company_id;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.admission == true) {
                ProductList.list = data.Products;
                ProductList.admission = true;
            }
            else {
                ProductList.admission = false;
                ProductList.error = data.error;
            }
            callback()
        })
        .catch((error) => {

            console.error(error);
        });
}

export function increaseProduct(api, mail, company_id, qr, amount, callback) {
    var request = {
        method: 'GET',
        headers: {
            'Host': 'autostorehouse.azurewebsites.net'
        }
    };

    var url = 'https://autostorehouse.azurewebsites.net/api/product/increase/' + api + '/' + mail + '/' + company_id + '/' + qr + '/' + amount;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {

            if (data.admission == true) {
                Product.quantity = Product.quantity + amount
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


export function decreaseProduct(api, mail, company_id, qr, amount, callback) {
    var request = {
        method: 'GET',
        headers: {
            'Host': 'autostorehouse.azurewebsites.net'
        }
    };
    var url = 'https://autostorehouse.azurewebsites.net/api/product/decrease/' + api + '/' + mail + '/' + company_id + '/' + qr + '/' + amount;
    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.admission == true) {
                Product.quantity = Product.quantity - amount
                Product.sold = Product.sold + amount
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

