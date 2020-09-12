
export var Auth = {
    mail: '',
    password: '',
    name: '',
    surname: '',
    api_key: '',
    company_id: -1,
    phone: '',
    admission: false,
    error: "Success",

};
export var Info = {
    productNumber: 0,
    totalproductNumber: 0,
    userApiRequest: 0,
    error: 'Success',
    admission: false
}
export function info_reset() {
    Info.error = 'Success'
    Info.admission = false
    Info.productNumber = 0
    Info.totalproductNumber = 0
    Info.userApiRequest = 0
}

export function auth_reset() {
    Auth.mail = ''
    Auth.password = ''
    Auth.name = ''
    Auth.surname = ''
    Auth.api_key = ''
    Auth.company_id = -1
    Auth.error = 'Success'
    Auth.admission = false
    Auth.phone = ''
}



