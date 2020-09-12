import React, { Component } from 'react'
import {
    Text,
    View,
    Button,
} from 'react-native'
import {
    Container,
    Content,
    Textarea,
    Card,
    CardItem,
    Right,
    Left,
    Input
} from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay';

import { _Header } from './Parts/Header'
import { page, page_color } from '../configure'
import { UserAccount } from '../backend/Account'
import { Auth } from '../model/auth'
import { Product, product_reset } from '../model/product';
import { _Company } from '../model/company'
import {Language} from '../language/Language'



export default class CreateProductScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            summary: '',
            quantity: '',
            price: 0,
            cost: 0,
            spinner: false,
        }
    }
    state = {
        name: '',
        summary: '',
        quantity: '',
        price: 0,
        cost: 0,
        spinner: false
    }
    calculateCost = (amount) => {
        this.setState({ cost: amount * this.state.price, quantity: amount })
    }
    cancel = () => {
        this.props.nav.goBack();
    }
    sumbit = () => {
        this.setState({ spinner: true })
        if (this.state.price == 0 || this.state.name == '') {
            alert(Language.data.home_page.register_product.error)
            this.setState({ spinner: false })
        }
        else {
            product_reset()
            Product.qr = ""
            Product.name = this.state.name
            Product.summary = this.state.summary
            if (this.state.quantity == 0 || this.state.quantity == '') {
                Product.quantity = 0
            }
            else {
                Product.quantity = parseInt(this.state.quantity, 10)
            }
            Product.price = parseInt(this.state.price, 10)
            Product.sold = 0
            Product.user_mail = Auth.mail
            Product.company_id = Auth.company_id
            UserAccount.AddProduct(Auth.api_key, Auth.mail, Auth.company_id, () => {
                if (Auth.admission == true) {
                    this.setState({ spinner: false })
                    alert(Language.data.home_page.register_product.success)
                    this.props.nav.goBack();
                }
                else {
                    this.setState({ spinner: false })
                    alert(Language.data.home_page.register_product.unsuccessful)
                    product_reset();
                }
            })
        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: page_color._1 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={Language.data.spinner}
                    textStyle={{
                        color: '#FFF',
                        fontSize: 30,
                    }}
                    size='large'
                    overlayColor='rgba(0, 0, 0, 0.6)'
                />
                <Content padder scrollEnabled>
                    <View style={{ marginVertical: page.height / 40 }}>

                        <Text style={{ marginVertical: page.height / 40 }}>{Language.data.home_page.register_product.name_label} : </Text>
                        <Input style={{
                            flex: 1,
                            borderColor: 'grey',
                            borderRadius: 3,
                            borderWidth: 1,
                        }} placeholder={Language.data.home_page.register_product.name_input} onChangeText={text => this.setState({ name: text })} />
                        <Text style={{ marginVertical: page.height / 40 }}>{Language.data.home_page.register_product.summary_label} : </Text>
                        <Textarea style={{
                            flex: 1,
                            borderColor: 'grey',
                            borderRadius: 3,
                            borderWidth: 1,
                        }} onChangeText={text => this.setState({ summary: text })} maxLength={200} rowSpan={5} placeholder={Language.data.home_page.register_product.summary_input} />
                        <Text style={{ marginVertical: page.height / 40 }}>{Language.data.home_page.register_product.price_label} : </Text>
                        <Input style={{
                            flex: 1,
                            borderColor: 'grey',
                            borderRadius: 3,
                            borderWidth: 1,
                        }} keyboardType='numeric' placeholder={Language.data.home_page.register_product.amount_input +Language.data.money_unit } onChangeText={text => this.setState({ price: text })} />
                        <Text style={{ marginVertical: page.height / 40 }}>{Language.data.home_page.register_product.amount_label} : </Text>
                        <Input style={{
                            flex: 1,
                            borderColor: 'grey',
                            borderRadius: 3,
                            borderWidth: 1,
                        }} keyboardType='numeric' placeholder={Language.data.home_page.register_product.amount_input} onChangeText={text => this.calculateCost(text)} />
                    </View>
                    <Card >
                        <CardItem style={{ backgroundColor: page_color._1 }}>
                            <Left>
                                <Text style={{
                                    fontSize: page.height / 25,
                                    fontWeight: 'bold'
                                }}>{Language.data.home_page.register_product.price_text} :</Text>
                            </Left>

                            <Right>
                                <Text style={{
                                    fontSize: page.height / 25,
                                    fontWeight: 'bold'
                                }}>{this.state.cost.toString() + Language.data.money_unit}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                    <View style={{
                        color: "#23A20F",
                        marginTop: 15,
                    }}>
                        <Button color='#23A20F' title={Language.data.home_page.register_product.sumbit_button} onPress={this.sumbit} />
                    </View>
                    <View style={{
                        marginTop: 15,
                        color: "#BC2727",
                        marginBottom: page.height / 3
                    }}>
                        <Button color='#BC2727' title={Language.data.home_page.register_product.cancel_button} onPress={this.cancel} />
                    </View>
                </Content>
            </Container>

        )
    }
}

