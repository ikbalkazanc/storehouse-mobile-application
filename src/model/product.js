export var ProductList = {
    list: [],
    error: 'Success',
    admission: false,
}
export function pickProduct(qr) {
    ProductList.list.forEach((value, key) => {
        if (value.qr == qr) {
            Product = value
        }
    })
}

export var Product = {
    qr: '',
    name: '',
    summary: '',
    quantity: 0,
    sold: 0,
    price: 0,
    company_id: 0,
    user_mail: '',
    admission: false,
    error: 'Success'
}

export function product_reset() {
    Product.qr = ''
    Product.name = ''
    Product.summary = ''
    Product.quantity = 0
    Product.sold = 0
    Product.price = 0
    Product.user_mail = ''
    Product.company_id = 0
    ProductList.error = "Success"
    ProductList.admission = false
    Product.admission = false
    Product.error = "Success"
}