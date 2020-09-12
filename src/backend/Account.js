import { setUser,setInfo, setCompany, setProduct,increaseProduct,decreaseProduct, setProducts } from './GetRequest'
import { insertOrder, updatePassword, insertProduct} from './PostRequest'
import * as Auth from '../model/auth';
import {_Company, company_reset} from '../model/company';
import {order_reset} from '../model/order'
import {deleteProduct} from './DeleteRequest'
import {  product_reset } from '../model/product';

class Account {
  constructor() {

  }

  login(mail, password, callback) {
    setUser(mail, password,callback);
    
  }
  Info(api,mail,company_id,callback){
    setInfo(api,mail,company_id,callback)
  }
  Company(api,mail,company_id,callback){
    setCompany(api,mail,company_id,callback)
  }
  Product(api,mail,company_id,qr,callback){
    setProduct(api,mail,company_id,qr,callback)
  }
  Products(api,mail,company_id,callback){
    setProducts(api,mail,company_id,callback)
  }
  IncreaseProduct(api,mail,company_id,qr,amount,callback){
    increaseProduct(api,mail,company_id,qr,amount,callback)
  }
  DecreaseProduct(api,mail,company_id,qr,amount,callback){
    decreaseProduct(api,mail,company_id,qr,amount,callback)
  }
  AddOrder(api,callback){
    insertOrder(api,callback)
  }
  AddProduct(api,mail,company_id,callback){
    insertProduct(api,mail,company_id,callback)
  }
  RemoveProduct(api,company_id,qr,callback){
    deleteProduct(api,company_id,qr,callback)
  }
  ResetPassword(mail,oldpassword,newpassword,callback){
    updatePassword(mail,oldpassword,newpassword,callback)
  }
  reset(){
    debugger
    Auth.info_reset();
    Auth.auth_reset();
    company_reset();
    product_reset();
    order_reset();
  }
}

var UserAccount = new Account()

export { UserAccount }