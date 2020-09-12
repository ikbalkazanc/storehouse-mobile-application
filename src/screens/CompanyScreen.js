import React, { Component } from 'react'
import { View } from 'react-native'

import { _CompanyScreen } from './Profiles/Company/index'
import { _Header } from './Parts/Header'
import { _Company } from '../model/company'


export default class Company extends Component {
    state = {
        errorMessage: '',
        error: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }
    render() {
        return (
            <View>
                <_Header navigation={this.props.nav} inDrawer={true} />
                <_CompanyScreen navigation={this.props.nav} />
            </View>
        )
    }
}
export { Company }