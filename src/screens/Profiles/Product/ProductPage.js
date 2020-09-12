import React, { Component } from 'react'
import {
  Divider,
  Card
} from 'react-native-elements'
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  Alert,
  Text,
  View,
} from 'react-native'

import { Card as ParabolyCard } from "@paraboly/react-native-card";
import DialogInput from 'react-native-dialog-input';

import { Auth } from '../../../model/auth';
import { page, page_color } from '../../../configure';
import { Product } from '../../../model/product'
import styles from '../../../Styles/style'
import { UserAccount } from '../../../backend/Account'
import  {Language} from  '../../../language/Language'


export class ProductPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      quantity: Product.quantity,
      sold: Product.sold,
      price: Product.price,
      summary: Product.summary,
      name: Product.name,
      qr: Product.qr,
      isAddDialogVisible: false,
      isRemoveDialogVisible: false
    }
  }
  state = {
    quantity: Product.quantity,
    sold: Product.sold,
    price: Product.price,
    summary: Product.summary,
    name: Product.name,
    qr: Product.qr,
    refreshing: false,
    isAddDialogVisible: false,
    isRemoveDialogVisible: false
  }
  onPressAdd = () => {
    Alert.alert(
      Language.data.product_page.add_warning.title,
      this.state.name + Language.data.product_page.add_warning.text,
      [
        {
          text: Language.data.product_page.add_warning.cancel,
          style: 'cancel'
        },
        { text:Language.data.product_page.add_warning.accept, onPress: () => this.Increase(1) }
      ],
      { cancelable: true }
    );
  }
  onPressManyAdd = () => {
    this.setState({ isAddDialogVisible: true })
  }
  onPressRemove = () => {
    Alert.alert(
      Language.data.product_page.remove_warning.title,
      this.state.name + Language.data.product_page.remove_warning.text,
      [
        {
          text: Language.data.product_page.remove_warning.cancel,
          style: 'cancel'
        },
        { text: Language.data.product_page.remove_warning.accept, onPress: () => this.Decrease(1) }
      ],
      { cancelable: true }
    );
  }
  onPressManyRemove = () => {
    this.setState({ isRemoveDialogVisible: true })
  }
  onPressOrder = () => {
    this.props.navigation.navigate("Order", { navigation: this.props.nav })
  }
  onPressDelete = () => {
    Alert.alert(
      Language.data.product_page.delete_warning.title,
      this.state.name +' '+ Language.data.product_page.delete_warning.text,
      [
        {
          text: Language.data.product_page.delete_warning.cancel,
          style: 'cancel'
        },
        { text: Language.data.product_page.delete_warning.accept, onPress: () => { this.deleteProduct() } }
      ],
      { cancelable: true }
    );
  }
  deleteProduct = () => {
    UserAccount.RemoveProduct(Auth.api_key, Auth.company_id, Product.qr, () => {
      if (Product.admission == true) {
        alert(Language.data.forgot_password.success)
        this.props.navigation.goBack();
      }
      else {
        alert(Product.error)
      }
    })
  }
  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={4}
          source={require('../../../images/profil-depo.jpg')}
        >
          <View style={styles.headerColumn}>
            <Text style={styles.userNameText}>{this.state.name}</Text>
            <View style={styles.userAddressRow}>
              <View>
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {this.state.qr}
                </Text>
              </View>
            </View>
            <View style={styles.userBioRow}>
              <Text style={styles.userBioText}>{this.state.summary}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  Increase = (amount) => {
    UserAccount.IncreaseProduct(Auth.api_key, Auth.mail, Auth.company_id, Product.qr, amount, () => {
      if (Product.admission == true) {
        this.setState({
          refreshing: false,
          quantity: Product.quantity,
          sold: Product.sold,
          price: Product.price,
          summary: Product.summary,
          name: Product.name,
          qr: Product.qr
        })
      }
      else {
        alert(Product.error)
      }
    })
  }
  Decrease = (amount) => {
    UserAccount.DecreaseProduct(Auth.api_key, Auth.mail, Auth.company_id, Product.qr, amount, () => {
      if (Product.admission == true) {
        this.setState({
          refreshing: false,
          quantity: Product.quantity,
          sold: Product.sold,
          price: Product.price,
          summary: Product.summary,
          name: Product.name,
          qr: Product.qr
        })
      }
      else {
        alert(Product.error)
      }
    })
  }

  openAddModal = (text) => {
    this.setState({ isAddDialogVisible: false })
    this.Increase(parseInt(text, 10))
  }
  openRemoveModal = (text) => {
    this.setState({ isRemoveDialogVisible: false })
    this.Decrease(parseInt(text, 10))
  }

  renderCards = () => {
    return (
      <View>
        <View style={styles.cards}>
          <View style={[styles.card, { marginVertical: page.height / 50 }]}>
            <ParabolyCard
              title={Language.data.product_page.remaining}
              iconName="home"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              onPress={() => { }}
              iconBackgroundColor={page_color._5}
              bottomRightText={this.state.quantity}
              content={Language.data.product_page.remaining_text_1 + Product.name + Language.data.product_page.remaining_text_2}
            />
          </View>
          <View style={[styles.card, { marginVertical: page.height / 50 }]}>
            <ParabolyCard
              title={Language.data.product_page.sold}
              iconName="home"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              onPress={() => { }}
              iconBackgroundColor={page_color._5}
              bottomRightText={this.state.sold}
              content={Language.data.product_page.sold_text_1+ Product.name + Language.data.product_page.sold_text_2}
            />
          </View>
          <View style={[styles.card, { marginVertical: page.height / 50 }]}>
            <ParabolyCard
              title={Language.data.product_page.price}
              iconName="price-tag"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              onPress={() => { }}
              iconBackgroundColor={page_color._5}
              bottomRightText={this.state.price + "₺"}
              content={Product.name + Language.data.product_page.price_text}
            />
          </View>
        </View>
        <View style={{ backgroundColor: '#F5F5F5', flex: 0 }}>
          <Divider style={{ backgroundColor: 'grey', color: 'red', height: page.height / 540, marginHorizontal: page.width / 35, marginVertical: page.height / 50 }} />
        </View>
        <View style={styles.cards}>
          <View style={styles.card}>
            <ParabolyCard
              title={Language.data.product_page.add}
              iconName="plus"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              onPress={this.onPressAdd}
              iconBackgroundColor='green'
              bottomRightText="+1"
              content={Language.data.product_page.add_text}
            />
          </View>
          <View style={[styles.card, { marginVertical: page.height / 50 }]}>
            <ParabolyCard

              title={Language.data.product_page.add_many}
              iconName="plus"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              onPress={this.onPressManyAdd}
              iconBackgroundColor='green'
              bottomRightText="?"
              content={Language.data.product_page.add_many_text}
            />
          </View>
          <View style={[styles.card, { marginVertical: page.height / 50 }]}>
            <ParabolyCard
              title={Language.data.product_page.remove}
              iconName="minus"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              onPress={this.onPressRemove}
              iconBackgroundColor='red'
              bottomRightText="-1"
              content={Language.data.product_page.remove_text}
            />
          </View>

          <View style={[styles.card, { marginVertical: page.height / 50 }]}>
            <ParabolyCard
              title={Language.data.product_page.remove_many}
              iconName="minus"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              onPress={this.onPressManyRemove}
              iconBackgroundColor='red'
              bottomRightText="?"
              content={Language.data.product_page.remove_many_text}
            />
          </View>


        </View>
        <View style={{ backgroundColor: '#F5F5F5', flex: 0 }}>
          <Divider style={{ backgroundColor: 'grey', color: 'red', height: page.height / 540, marginHorizontal: page.width / 35, marginVertical: page.height / 50 }} />
        </View>
        <View style={styles.cards}>
          <View style={[styles.card, { marginVertical: page.height / 50 }]}>
            <ParabolyCard
              title={Language.data.product_page.order}
              iconName="upload"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              onPress={this.onPressOrder}
              iconBackgroundColor='#FFCC00'
              content={Language.data.product_page.order_text}
            />
          </View>
          <View style={[styles.card, { marginVertical: page.height / 50 }]}>
            <ParabolyCard
              title={Language.data.product_page.delete}
              iconName="cross"
              defaultTitle=""
              iconType="Entypo"
              defaultContent=""
              onPress={this.onPressDelete}
              iconBackgroundColor='#C60000'
              content={Language.data.product_page.delete_text}
            />
          </View>

        </View>


      </View>
    )
  }

  onRefresh = () => {
    UserAccount.Product(Auth.api_key, Auth.mail, Auth.company_id, Product.qr, () => {
      if (Product.admission == true) {
        this.setState({
          refreshing: false,
          quantity: Product.quantity,
          sold: Product.sold,
          price: Product.price,
          summary: Product.summary,
          name: Product.name,
          qr: Product.qr
        })
      }
      else {
        this.setState({ errorMessage: Product.error })
        alert(Product.error)
      }
    })
  }

  render() {
    return (
      <ScrollView style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }>
        <DialogInput isDialogVisible={this.state.isRemoveDialogVisible}
          title={Language.data.product_page.add_many_warning.title}
          message={Language.data.product_page.add_many_warning.text}
          hintInput={Language.data.product_page.add_many_warning.input}
          cancelText={Language.data.product_page.remove_many_warning.cancel}
          sumbitText={Language.data.product_page.remove_many_warning.sumbit}
          submitInput={(text) => this.openRemoveModal(text)}
          closeDialog={() => { this.setState({ isRemoveDialogVisible: false }) }}>
        </DialogInput>
        <DialogInput isDialogVisible={this.state.isAddDialogVisible}
          title={Language.data.product_page.remove_many_warning.title}
          message={Language.data.product_page.remove_many_warning.text}
          hintInput={Language.data.product_page.remove_many_warning.input}
          cancelText={Language.data.product_page.remove_many_warning.cancel}
          sumbitText={Language.data.product_page.remove_many_warning.sumbit}
          submitInput={(text) => this.openAddModal(text)}
          closeDialog={() => { this.setState({ isAddDialogVisible: false }) }}>
        </DialogInput>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer} >
            {this.renderHeader()}
            <View style={{ height: page.height / 100, backgroundColor: page_color._5 }}></View>
            {this.renderCards()}
            <View style={{ height: page.height / 2.2, backgroundColor: '#F5F5F5' }}></View>
          </Card>
        </View>
      </ScrollView>
    )
  }
}

export default ProductPage

