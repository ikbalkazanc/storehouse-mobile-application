import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Email from '../commons/Email'
import Separator from '../commons/Separator'
import Tel from '../commons/Tel'

import mainColor from '../commons/constants'
import { Auth } from '../../../model/auth';
import {  _Company, company_reset } from '../../../model/company';
import { UserAccount } from '../../../backend/Account'
import {Language} from '../../../language/Language'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
    
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})

class CompanyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      mail:'',
      phone:''
    };
    this.getCompany();
  }

  state = {
    error:false,
    errorMessage:'',
    mail: '',
    phone: ''
  }
  getCompany = () => {
    company_reset()
    UserAccount.Company(Auth.api_key, Auth.mail, Auth.company_id, () => {
      if (_Company.admission != true) {
        debugger
        this.setState({ errorMessage: _Company.error })
        this.setState({ error: true })
        company_reset()
      }
      else {
        this.setState({ mail: _Company.mail })
        this.setState({ phone: _Company.phone })
      }
    })
  }

  onPressPlace = () => {
    console.log('place')
  }

  onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
    console.log('sms')
  }

  onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={4}
          source={require('../../../images/profil-depo.jpg')}
        >
          <View style={styles.headerColumn}>
            <Text style={styles.userNameText}>{_Company.name.toUpperCase()} </Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  Türkiye
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderTel = () => (
    <View style={styles.emailContainer}>
      <Tel
        key={`tel-${0}`}
        index={'0'}
        name={Language.data.profile_page.number_text}
        number={this.state.phone}
        onPressSms={this.onPressSms}
        onPressTel={this.onPressTel}
      />
    </View>
  )

  renderEmail = () => (
    <View style={styles.emailContainer}>
      <Email
        key={`email-${0}`}
        index={'0'}
        name={Language.data.profile_page.mail_text}
        email={this.state.mail}
        onPressEmail={this.onPressEmail}
      />
    </View>
  )

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderTel()}
            {Separator()}
            {this.renderEmail()}
          </Card>
        </View>
      </ScrollView>
    )
  }
}

export default CompanyProfile
