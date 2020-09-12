import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native'

import Swiper from 'react-native-swiper'

import { page_color, page } from '../configure';
import * as Stroage from '../Stroage/Stroage'
import { UserAccount } from '../backend/Account';
import { Auth, auth_reset } from '../model/auth';
import { Svg, SvgUri } from 'react-native-svg';
import { Language } from '../language/Language'
import Logo from '../images/logo.svg'

export default class FirstScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            spinner: true
        };
    }
    state = {
        text: '',
        spinner: true
    }
    componentDidMount() {
        this.setState({ text: "İşleniyor ... " })
        Stroage.Get("Language", (value) => {
            if (value == null) {
                Stroage.Set("Language", "en", () => {
                    Language.setLanguage("en");
                })
            }
            else {
                Stroage.Get("Language", (value) => {
                    Language.setLanguage(value);  
                })
            }
            Stroage.Get("isFirst", (value) => {
                if (value == null || value == "true") {
                    Stroage.Set("isFirst", "false")
                    this.setState({ spinner: false })
                    this.setState({ text: "Tanıtım sayfası" })
                    this.props.nav.navigate('Welcome', { nav: this.props.navigation })
                }
                else {
                    Stroage.Get("isLog", (value) => {
    
                        if (value == null || value == "false") {
                            this.setState({ text: "Giriş sayfasına yönlendiriliyorsunuz" })
                            this.setState({ spinner: false })
                            this.props.nav.navigate('Login', { nav: this.props.navigation })
                        }
                        else {
                            this.setState({ text: "İşleniyor" })
                            Stroage.Gets(["@UserMail", "@UserPassword"], (values) => {
                                auth_reset()
                                UserAccount.login(values[0][1], values[1][1], () => {
                                    this.setState({ spinner: false })
                                    if (Auth.admission == true) {
                                        //this.props.nav.navigate('Drawer', { screen: 'Home' })
                                        this.props.nav.reset({
                                            index: 0,
                                            routes: [{ name: 'Drawer', params: { screen: 'Home' }, }],
                                        });
                                    }
                                    else {
                                        alert(Auth.error + " Giriş sayfasına yönlendiriliyorsunuz")
                                        auth_reset()
                                        this.props.nav.navigate('Login', { nav: this.props.navigation })
                                    }
                                })
                            })
                        }
                    })
                }
    
            })

        })
        

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>sda</Text>

            </View>
        )
    }
}
export { FirstScreen }


const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: page_color._1,
        height: page.height,
        width: page.width
    },



});