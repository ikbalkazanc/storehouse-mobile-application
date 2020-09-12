export var _Company = {
    id: '',
    name: '',
    bill: 0,
    phone: '',
    mail: '',
    error: 'Succes',
    admission: false
}
export function company_reset() {
    _Company.id = ''
    _Company.name = ''
    _Company.bill = 0
    _Company.phone = ''
    _Company.mail = ''
    _Company.error = 'Succes'
    _Company.admission = false

}