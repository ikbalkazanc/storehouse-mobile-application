import React, { Component } from 'react'
import { View } from 'react-native'

import { ProfileScreen } from "./Profiles/Profile/index"
import { _Header } from './Parts/Header'

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <_Header navigation={this.props.nav} inDrawer={true} />
                <ProfileScreen navigation={this.props.nav} />
            </View>
        )
    }
}
export { Profile }
