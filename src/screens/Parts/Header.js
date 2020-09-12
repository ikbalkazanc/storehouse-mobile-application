import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Header,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';

import { page, page_color } from '../../configure'

export default class _Header extends Component {
  constructor(props) {
    super(props);
  }
  back = () => {
    this.props.navigation.goBack()
  }
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  }
  render() {
    if (this.props.inDrawer) {
      return (
        <Header style={styles.header} androidStatusBarColor={page_color._5} noShadow>
          <Left>
            <Button transparent
              onPress={this.toggleDrawer}
            >
              <Icon name='ios-menu-outline' />
            </Button>
          </Left>
          <Right>
          </Right>
        </Header>
      )
    } else {
      return (
        <Header style={styles.header} androidStatusBarColor={page_color._5} noShadow>
          <Left>
            <Button transparent
              onPress={this.back}
            >
              <Icon name='chevron-back' style={{ fontSize: page.height / 20 }} />
            </Button>
          </Left>
          <Right>
          </Right>
        </Header>

      )
    }



  }
}


const styles = StyleSheet.create({
  header: {
    backgroundColor: page_color._5,
  },
});

export { _Header }