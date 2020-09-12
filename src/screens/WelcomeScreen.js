import React, { Component } from 'react'
import { Text, View, TouchableOpacity, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native'

import Slide1 from '../images/slide1.svg'
import Slide2 from '../images/slide2.svg'
import Slide3 from '../images/slide3.svg'


import Swiper from 'react-native-swiper'

import { page } from '../configure'

export default class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ""
    }
  }
  state = {
    text: ""
  }


  _goLogin = () => {
    this.props.nav.reset({
      index: 0,
      routes: [{ name: 'Login' }],
  });
  }

  render() {

    return (
      <Swiper showsPagination={false} showsButtons={false} loop={false}>
        <View style={{
          flex: 1,
          paddingTop: page.height / 10,
          paddingLeft: page.width / 10,
          backgroundColor: '#9DD6EB'
        }}>
          <View style={{
            position: 'absolute',
            bottom: 0
          }}>
            <Slide1 width={page.width} height={page.height / 2 + 100} />
          </View>
          <Text style={{
            color: '#8EBED7',
            fontSize: 40,
            fontWeight: 'bold'
          }}>KODU TARAT</Text>
          <Text style={{
            color: '#8EBED7',
            fontSize: 40,
            fontWeight: 'bold'
          }}>İŞLEM SEÇ</Text>
        </View>
        <View style={{
          flex: 1,
          paddingTop: page.height / 1.8,
          paddingLeft: page.width / 10,
          alignItems: 'center',
          backgroundColor: '#97CAE5'
        }}>

          <View style={{
            position: 'absolute',
            top: page.height / 30
          }}>
            <Slide2 width={page.width * 0.9} height={page.height / 2} />
          </View>

          <Text style={{
            color: '#9DD6EB',
            fontSize: 50,
            fontWeight: 'bold',

          }}>BULUTA YÜKLENSİN</Text>
        </View>
        <View style={{
          flex: 1,
          paddingTop: page.height / 10,
          paddingLeft: page.width / 10,
          backgroundColor: '#92BBD9'
        }}>

          <View style={{
            position: 'absolute',
            bottom: 0
          }}>
            <Slide3 width={page.width * 1.5} height={page.height * 1.5} />
          </View>
          <Text style={{
            color: '#62ABE2',
            fontSize: 50,
            fontWeight: 'bold'
          }}>İSTEDİĞİN ZAMAN, İSTEDİĞİN YERDE ERİŞİM SAĞLA </Text>

          <TouchableOpacity style={{ position: 'absolute', bottom: page.height / 20, right: page.width / 15 }} onPress={this._goLogin}>
            <Text style={{color:'#0070FF',fontSize:20}}>Uygulamaya geç</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    )
  }
}

export { Welcome }