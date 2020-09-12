import React, { Component } from 'react'
import {
  StatusBar,
  Text,
  Button,
  View,
  ActivityIndicator
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Input } from 'react-native-elements';

import { page_color, page } from '../configure';
import { Auth, auth_reset } from '../model/auth';
import { UserAccount } from '../backend/Account';
import {Language} from '../language/Language'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      mail: 'ahmet@gmail.com',
      password: '123',
      loading: false,
    };
  }
  state = {
    errorMessage: '',
    mail: '',
    password: '',
    loading: false,
    name: Auth.name,
    surname: Auth.surname,
  }

  _login = () => {

    auth_reset()
    this.setState({ loading: true })

    if (this.state.mail == '' || this.state.password == '') {
      this.setState({ errorMessage: Language.data.login_page.login_error })
    }
    else {
      UserAccount.login(this.state.mail, this.state.password, () => {

        if (Auth.admission == true) {
          this.setState({ loading: false })
          this.props.nav.reset({
            index: 0,
            routes: [{ name: 'Drawer', params: { screen: 'Home' }, }],
          });
        }
        else {
          this.setState({ loading: false })
          this.setState({ errorMessage: Auth.error })
          auth_reset()
        }

      })
    }
  }
  _forgotPassword = () => {
    this.props.nav.navigate('ForgotPassword')
  }
  _pres = () => {
    this.props.nav.navigate('Product')
  }
  _pressAccount=()=>{
  
  }


  render() {

    if (this.state.loading) {
      return (

        <View style={{
          flex: 1,
          backgroundColor: page_color._1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ActivityIndicator size='large' color={page_color._5} />
        </View>
      );
    } else {

      return (

        <SafeAreaView style={{ width: page.width, height: page.height, flex: 1, backgroundColor: page_color._1 }}>

          <StatusBar backgroundColor={page_color._5} barStyle='dark-content'></StatusBar>
          <View style={{ width: page.width, height: page.height / 11.1, backgroundColor: page_color._5, alignItems: 'center', padding: 10 }}>
            <Text style={{
              fontSize: 35,
              color: page_color._1,
              fontWeight: 'bold',
            }}>A</Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',

            paddingHorizontal: page.width / 11.1,
          }}>
            <Text style={
              {
                fontSize: 50,
                fontWeight: 'bold',
                marginBottom: page.height / 22.2,
                color: page_color.FONT,
              }
            }>{Language.data.login_page.big_title}</Text>
            <Input
              placeholder={Language.data.login_page.mail_input}
              autoCompleteType='email'
              onChangeText={(value) => this.setState({ mail: value })}
              errorMessage={this.state.errorMessage}
              errorStyle={{ color: 'red' }}
            />
            <Input
              placeholder={Language.data.login_page.password_input}
              secureTextEntry={true}
              onChangeText={(value) => this.setState({ password: value })}

            />
            <Button
              title={Language.data.login_page.login_button}
              color={page_color._5}
              onPress={this._login}
            />
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text
                onPress={this._forgotPassword}
                style={{
                  fontSize: 9,
                  color: page_color.FONT,
                }}>{Language.data.login_page.forgot_password}
          <Text
                  style={{
                    textDecorationLine: 'underline',
                    fontWeight: 'bold'
                  }}
                > {Language.data.login_page.forgot_password_bold}</Text>
              </Text>

            </View>
            <View style={{
              paddingTop: page.width / 11.1,
            }}>

              <Button
                title={Language.data.login_page.button2}
                onPress={() => this._pressAccount()}
                color={page_color._5}

              ></Button>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  fontSize: 12,
                  color: page_color.FONT,
                  fontWeight: 'bold'
                }}

                >{Language.data.login_page.button2_text}</Text>


              </View>
            </View>
          </View>

        </SafeAreaView>
      )
    }
  }
}

export { Login }