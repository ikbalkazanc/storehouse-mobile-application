import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Icon
} from 'native-base';

import { page_color } from '../../configure';
import { Info } from '../../model/auth';
import {Language} from '../../language/Language'

export default class Information extends Component {



  render() {
    return (
      <Content style={styles.container}>
        <Card>
          <CardItem style={styles.card}>
            <Body>
              <Icon name='home' />
              <Text>
                {Language.data.home_page.information_page.product_type_number} : {Info.productNumber}
              </Text>
              <Text>
                {Language.data.home_page.information_page.total_product_number} : {Info.totalproductNumber}
              </Text>
              <Text>
                {Language.data.home_page.information_page.total_request_number} : {Info.userApiRequest}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
  }
}


export { Information }


const styles = StyleSheet.create({
  container: {
    backgroundColor: page_color._1,
    paddingHorizontal: 10
  },
  card: {

    backgroundColor: page_color._3,
  },

});