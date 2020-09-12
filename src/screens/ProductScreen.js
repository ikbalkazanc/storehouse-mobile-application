import React, { Component } from 'react'
import { View } from 'react-native'

import { ProductPage } from "./Profiles/Product/ProductPage"
import { _Header } from './Parts/Header'


export default class Product extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <_Header navigation={this.props.nav} inDrawer={false} />
                <ProductPage navigation={this.props.nav} isLoaded={this.props.isLoaded} />
            </View>
        )
    }
}
export { Product }
