import React, { Component } from 'react'
import {
  StyleSheet,
  Alert,
  ScrollView,
  RefreshControl
} from 'react-native'
import {
  Container,
  TabHeading,
  Tab,
  Tabs,
  Icon
} from 'native-base';

import { Qrcode } from './Home/qrcode'
import * as Stroage from '../Stroage/Stroage'

import { Auth, info_reset, Info } from '../model/auth'
import { page_color, page } from '../configure';
import Information from './Home/information'
import { UserAccount } from '../backend/Account'
import _Header from './Parts/Header'
import ProductList from './Home/productList'
import {Language} from '../language/Language'

export default class Home extends Component {
  state = {
    errorMessage: '',
    error: false,
    refreshing: false

  }
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      refreshing: false
    };

    this.getInfo();

  }
  getInfo = () => {
    info_reset()
    UserAccount.Info(Auth.api_key, Auth.mail, Auth.company_id, () => {
      this.setState({ errorMessage: Info.error })
      if (Info.admission != true) {
        debugger
        this.setState({ errorMessage: Info.error })
        this.setState({ error: true })
        info_reset()
      }
    })
  }
  onRefresh = () => {
    UserAccount.Info(Auth.api_key, Auth.mail, Auth.company_id, () => {
      this.setState({ errorMessage: Info.error })
      if (Info.admission != true) {
        debugger
        this.setState({ errorMessage: Info.error })
        this.setState({ error: true })
        Info.admission = true  //önceki verileri geri döndürüyor
        Info.error = 'Success'
      }
    })

  }
  componentDidMount() {
    Stroage.Get("isLog", (value) => {
      if (value == "false" || value == null) {
        Alert.alert(
          Language.data.home_page.account_record.title,
          Language.data.home_page.account_record.text,
          [
            {
              text: Language.data.home_page.account_record.cancel,
              style: 'cancel'
            },
            { text: Language.data.home_page.account_record.ok, onPress: () => { this._LogUser() } }
          ],
          { cancelable: true }
        );
      }
    })
  }

  _LogUser = () => {
    Stroage.Set("isLog", "true")
    Stroage.Set("UserMail", Auth.mail)
    Stroage.Set("UserPassword", Auth.password)
  }

  render() {
    return (
      <Container>
        <_Header navigation={this.props.nav} inDrawer={true} />
        <Tabs style={{ backgroundColor: page_color._1 }}>
          <Tab
            tabStyle={{ backgroundColor: page_color._5 }}
            activeTabStyle={{ backgroundColor: page_color._5 }}
            heading={<TabHeading style={{ backgroundColor: page_color._5 }}><Icon name="ios-information-circle-outline" /></TabHeading>}>
            <ScrollView
              style={styles.scrollView}
              refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
              }>
              <Information />
            </ScrollView>
          </Tab >
          <Tab
            tabStyle={{ backgroundColor: page_color._5 }}
            activeTabStyle={{ backgroundColor: page_color._5 }}
            heading={<TabHeading style={{ backgroundColor: page_color._5 }}><Icon name="ios-list" /></TabHeading>}
          >
            <ProductList navigation={this.props.nav} />
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: page_color._5 }}
            activeTabStyle={{ backgroundColor: page_color._5 }}
            heading={<TabHeading style={{ backgroundColor: page_color._5 }}><Icon name="ios-qr-code-outline" /></TabHeading>}
          >
            <Qrcode navigation={this.props.nav} />
          </Tab>
        </Tabs>
      </Container >
    )
  }
}
export { Home }

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  card: {
    backgroundColor: page_color._3,
  },
  scrollView: {
    backgroundColor: page_color._1,
  },
});
