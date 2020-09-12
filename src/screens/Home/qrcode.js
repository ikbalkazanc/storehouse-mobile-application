import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner';
import Spinner from 'react-native-loading-spinner-overlay';

import { page_color, page } from '../../configure';
import { UserAccount } from '../../backend/Account'
import { Product as ProductScreen } from '../ProductScreen'
import { Auth } from '../../model/auth'
import { Product, product_reset } from '../../model/product'
import {Language} from '../../language/Language'

export default class Qrcode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      spinner: false,
      isActive: false
    }
  }
  state = {
    spinner: false,
    code: '',
    errorMessage: '',
    isActive: false
  }

  onSuccess = e => {
    if (e.data.length > 8) {
      alert(Language.home_page.qr_page_small_qr_error)
    }
    else {
      product_reset()
      this.setState({ spinner: !this.state.spinner })
      this.setState({ code: e.data })
      UserAccount.Product(Auth.api_key, Auth.mail, Auth.company_id, e.data, () => {
        if (Product.admission == true) {
          this.setState({ spinner: false })
          this.props.navigation.navigate('Product', { nav: this.props.navigation })
          this.scanner.disable();
        }
        else {
          alert(Product.error)
          this.setState({ spinner: false })
          product_reset()
        }
      })
    }
  };

  componentDidUpdate = () => {
    this.scanner.enable();
  }

  render() {
    return (
      <View>
        <Spinner
          visible={this.state.spinner}
          textContent={this.state.code}
          textStyle={styles.spinnerTextStyle}
          size='large'
          overlayColor='rgba(0, 0, 0, 0.6)'

        />
        <QRCodeScanner
          onRead={this.onSuccess}
          //flashMode={RNCamera.Constants.FlashMode.torch}
          ref={(node) => { this.scanner = node }}
          fadeIn={true}
          reactivate={true}
          reactivateTimeout={2000}
          showMarker={true}
          markerStyle={{ borderColor: '#fff', borderRadius: 20, borderWidth: 3.5, borderStyle: 'dashed' }}
          cameraStyle={{
            backgroundColor: 'red',
            flex: 3
          }}
          containerStyle={{
          }}
          topViewStyle={{ height: 0, flex: 0 }}
          bottomViewStyle={{ height: 0, flex: 0 }}
          containerStyle={{
            marginTop: 0
          }}
        />
      </View>
    )
  }
}

export { Qrcode }


const styles = StyleSheet.create({
  container: {
    backgroundColor: page_color._1,
    paddingHorizontal: 10
  },
  card: {

    backgroundColor: page_color._3,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center'

  },
  buttonTouchable: {
    padding: 16
  },
  loading: {
    height: page.height / 5,
    width: page.height / 5,
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 30,

  },

});