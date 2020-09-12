import React, { Component, } from 'react'
import {
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    StyleSheet
} from 'react-native'
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Icon
} from 'native-base'

import Spinner from 'react-native-loading-spinner-overlay';
import InformationCard from "@paraboly/react-native-information-card";

import { Auth } from '../../model/auth';
import { page, page_color } from '../../configure';
import { UserAccount } from '../../backend/Account';
import { ProductList as Products, pickProduct } from '../../model/product'
import { product_reset } from '../../model/product'
import {Language} from '../../language/Language'

export default class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            refreshing: false
        }
        this.loadProducts()
    }
    state = {
        data: "",
        refreshing: false
    }
    loadProducts = () => {
        UserAccount.Products(Auth.api_key, Auth.mail, Auth.company_id, () => {
            if (Products.admission == true) {
                this.setState({ data: Products.list })
            }
            else {
                alert(Products.error)
            }
        })
    }
    gotoItem = (qr) => {
        this.setState({ spinner: true })
        product_reset()
        pickProduct(qr);
        this.props.navigation.navigate('Product')
        this.setState({ spinner: false })
    }
    refresh = () => {
        this.loadProducts()
    }
    gotoCreate = () => {
        this.props.navigation.navigate("createProduct")
    }
    onRefresh = () => {
        UserAccount.Products(Auth.api_key, Auth.mail, Auth.company_id, () => {
            if (Products.admission == true) {
                this.setState({ data: Products.list })
            }
            else {
                alert(Products.error)
            }
        })
    }
    emptyList = () => {
        return (
            <Container style={styles.container}>
                <Content>
                    <Card style={styles.card}>
                        <CardItem style={styles.carditem}>
                            <Icon name="ios-information-circle-sharp"></Icon>
                            <Text>{Language.data.home_page.product_list.empty_list}</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
    renderItem = ({ item }) => {
        var color;
        var status;
        if (item.quantity < 10) {
            color = "#FF9033"
            status = Language.data.home_page.product_list.status1
        }
        else {
            color = "green"
            status = Language.data.home_page.product_list.status3
        }
        if (item.quantity == 0) {
            color = "#DE0000"
            status = Language.data.home_page.product_list.status2
        }
        return (
            <View style={{ alignItems: "center", marginVertical: page.width / 50 }}>
                <InformationCard
                    secondaryDateTitle=""
                    secondaryDateText="Adet :"
                    dateTitle=""
                    dateText={item.quantity.toString()}
                    borderColor={color}
                    statusText={status}
                    statusColor={color}
                    description={item.summary}
                    title={item.name}
                    iconName="arrow-forward"
                    iconColor="#fdfdfd"
                    onPress={() => { this.gotoItem(item.qr) }}
                />
            </View>
        );
    }
    render() {
        return (
            <View style={{ backgroundColor: page_color._1, flex: 1 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={Language.data.spinner}
                    textStyle={styles.spinnerTextStyle}
                    size='large'
                    overlayColor='rgba(0, 0, 0, 0.6)'
                />
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }
                    extraData={this.state}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.qr}
                    ListEmptyComponent={this.emptyList}
                    onPressItem={this.reflesh}
                    refreshing={true}
                />
                <TouchableOpacity
                    style={{
                        height: page.height / 11.1,
                        width: page.height / 11.1,
                        borderRadius: 100,
                        bottom: page.height / 20,
                        left: page.height / 40,
                        backgroundColor: "#3F3DFF",
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={this.gotoCreate} >
                    <Icon style={{
                        fontSize: page.height / 18,
                        color: "white",
                    }} name="ios-add-sharp" ></Icon>
                </TouchableOpacity>
            </View>
        )
    }
}


export { ProductList }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: page_color._1
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: page.height / 45,

    },
    card: {
        backgroundColor: page_color._3,
        fontSize: 15,
    },
    carditem: {
        backgroundColor: page_color._3
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontSize: 30,

    },

});