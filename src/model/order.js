export var Order = {
   user_mail:'',
   summary:'',
   quantity:0,
   company_id:0,
   product_qr:'',
   error:'',
   admission:false
}

export function order_reset(){
    Order.user_mail='',
    Order.summary='',
    Order.quantity=0,
    Order.company_id=0,
    Order.product_qr=''
    Order.error='',
    Order.admission=false
}