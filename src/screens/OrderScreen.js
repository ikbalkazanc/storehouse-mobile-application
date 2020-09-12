import React, { Component } from 'react'
import {
    Text,
    View,
    Button
} from 'react-native'
import {
    Container,
    Content,
    Textarea,
    Card,
    CardItem,
    Body,
    Right,
    Left,
    Input
} from 'native-base'

import Spinner from 'react-native-loading-spinner-overlay';

import { page, page_color } from '../configure'
import { UserAccount } from '../backend/Account'
import { Auth } from '../model/auth'
import { Order, order_reset } from '../model/order'
import { Product } from '../model/product';
import { _Company } from '../model/company';
import  {Language} from '../language/Language'

export default class OrderScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cost: 0,
            one: 152,
            loading: false,
            errorMessage: '',
            summary: '',
            quantity: 0,
        }

    }
    state = {
        one: 152,
        cost: 0,
        loading: false,
        errorMessage: '',
        summary: '',
        quantity: 0,
    }
    calculateCost = (amount) => {
        this.setState({ cost: amount * Product.price, quantity: amount })
    }
    cancel = () => {
        this.props.navigation.goBack();
    }
    sumbit = () => {
        this.setState({ loading: true })
        if (this.state.quantity == 0) {
            alert(Language.data.order_page.error)
            this.setState({ loading: false })
        }
        else {
            order_reset();
            Order.quantity = parseInt(this.state.quantity, 10);
            Order.summary = this.state.summary;
            Order.product_qr = Product.qr;
            Order.user_mail = Auth.mail;
            Order.company_id = Auth.company_id;
            UserAccount.AddOrder(Auth.api_key, () => {
                if (Order.admission == true) {
                    this.setState({ loading: false })
                    this.props.navigation.goBack();
                }
                else {
                    this.setState({ loading: false })
                    this.setState({ errorMessage: Order.error })
                    order_reset();
                }
            })
        }
    }
    render() {
        return (
            <Container >
                <Spinner
                    visible={this.state.loading}
                    textContent={Language.data.spinner}
                    textStyle={{
                        color: '#FFF',
                        fontSize: 30,
                    }}
                    size='large'
                    overlayColor='rgba(0, 0, 0, 0.6)'
                />
                <Content padder scrollEnabled>
                    <Card>
                        <CardItem>
                            <Body >
                                <Text><Text style={{
                                    fontSize: page.height / 50,
                                    fontWeight: 'bold',
                                }}>{Language.data.order_page.product_label} :</Text>{Product.name}</Text>
                                <Text><Text style={{
                                    fontSize: page.height / 50,
                                    fontWeight: 'bold',
                                }}>{Language.data.order_page.user_label} :</Text>{Auth.name + ' ' + Auth.surname}</Text>
                                <Text><Text style={{
                                    fontSize: page.height / 50,
                                    fontWeight: 'bold',
                                }}>{Language.data.order_page.company_label} :</Text>{_Company.name}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <View style={{ marginVertical: page.height / 40 }}>
                        <Text style={{ marginTop: page.height / 50 }}>{Language.data.order_page.summary_label} : </Text>
                        <Textarea style={{
                            flex: 1,
                            borderColor: 'grey',
                            borderRadius: 3,
                            borderWidth: 1,
                        }} maxLength={200} onChangeText={text => this.setState({ summary: text })} rowSpan={5} placeholder={Language.data.order_page.summary_input} />
                        <Text style={{ marginTop: page.height / 50 }}>{Language.data.order_page.amount_label} : </Text>
                        <Input style={{
                            flex: 1,
                            borderColor: 'grey',
                            borderRadius: 3,
                            borderWidth: 1,
                        }} keyboardType='numeric' placeholder={Language.data.order_page.amount_input} onChangeText={text => this.calculateCost(text)} />
                    </View>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{
                                    fontSize: page.height / 25,
                                    fontWeight: 'bold'
                                }}>{Language.data.order_page.price_text} :</Text>
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
                        <Button color='#23A20F' title={Language.data.order_page.sumbit_button} onPress={this.sumbit} />
                    </View>
                    <View style={{
                        marginTop: 15,
                        color: "#BC2727",
                        marginBottom: page.height / 3
                    }}>
                        <Button color='#BC2727' title={Language.data.order_page.cancel_button} onPress={this.cancel} />
                    </View>
                </Content>
            </Container>
        )
    }
}


export { OrderScreen }
