import React, { Component } from 'react'
import {
    View,
    Button,
    StyleSheet
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { _Header } from './Parts/Header'
import { UserAccount } from '../backend/Account';
import { Password, password_reset } from '../model/password'
import { page, page_color } from '../configure'

export default class ForgotScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            loading: false,
            oldPassword: '',
            mail: '',
            newPassword: ''
        };
    }
    state = {
        errorMessage: '',
        loading: false,
        oldPassword: '',
        mail: '',
        newPassword: ''
    }
    _Sumbit = () => {
        if (this.state.oldPassword == '' || this.state.newPassword == '' || this.state.oldPassword == '') {
            alert(Language.data.forgot_password_page.fill_inputs_error.text)
        }
        else {
            password_reset();
            this.setState({ loading: true })
            UserAccount.ResetPassword(this.state.mail, this.state.oldPassword, this.state.newPassword, () => {
                if (Password.admissinon == true) {
                    alert(Language.data.forgot_password_page.success)
                    this.props.nav.goBack();
                }
                else {
                    alert(Password.error)
                }
                password_reset();
                this.setState({ loading: false })
            })
        }
    }

    render() {
        return (
            <SafeAreaView style={{ width: page.width, height: page.height, flex: 1, backgroundColor: page_color._1 }}>
                <Spinner
                    visible={this.state.loading}
                    textContent={Language.data.spinner}
                    textStyle={styles.spinnerTextStyle}
                    size='large'
                    overlayColor='rgba(0, 0, 0, 0.6)'
                />
                <_Header navigation={this.props.nav} inDrawer={false} />
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingHorizontal: page.width / 11.1,
                }}>
                    <Input
                        placeholder='Mail hesabınızı giriniz'
                        autoCompleteType='email'
                        onChangeText={(value) => this.setState({ mail: value })}
                        errorMessage={this.state.errorMessage}
                        errorStyle={{ color: 'red' }}
                    />
                    <Input
                        placeholder="Eski şifrenizi giriniz"
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({ oldPassword: value })}
                    />
                    <Input
                        placeholder="Yeni şifrenizi giriniz"
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({ newPassword: value })}

                    />
                    <Button
                        title={Language.data.forgot_password_page.sumbit}
                        color={page_color._5}
                        onPress={this._Sumbit}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

export { ForgotScreen }

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
        fontSize: 30,
    },
})