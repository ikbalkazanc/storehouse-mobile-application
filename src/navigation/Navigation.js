import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Icon } from 'native-base';

import * as Stroage from '../Stroage/Stroage'
import {Home} from '../screens/HomeScreen'
import { Product as ProductScreen } from '../screens/ProductScreen'
import { _Company } from '../model/company'
import Company from '../screens/CompanyScreen'
import Login from '../screens/LoginScreen'
import { page_color, page } from '../configure';
import { Auth, auth_reset } from '../model/auth'
import { OrderScreen } from '../screens/OrderScreen'
import { FirstScreen } from '../screens/FirstScreen'
import { ForgotScreen } from '../screens/ForgotScreen'
import CreateProductScreen from '../screens/CreateProductScreen'
import Profile from '../screens/ProfileScreen'
import Welcome from '../screens/WelcomeScreen'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function company({ navigation }) {
  return (
    <Company nav={navigation} />
  );
}
function profile({ navigation }) {
  return (
    <Profile nav={navigation} />
  );
}
function logOut({ navigation }) {
  auth_reset(navigation)
  return (
    <Login nav={navigation} />

  );
}

function login({ navigation }) {
  return (

    <Login nav={navigation} />
  );
}
function welcome({ navigation }) {
  return (
    <Welcome nav={navigation} />

  );
}
function product({ navigation }) {
  return (
    <ProductScreen nav={navigation} />

  );
}
function order({ navigation }) {
  return (
    <OrderScreen navigation={navigation} />

  );
}
function home({ navigation }) {
  return (
    <Home nav={navigation} />

  );
}
function forgotPassword({ navigation }) {
  return (
    <ForgotScreen nav={navigation} />

  );
}
function first({ navigation }) {
  return (
    <FirstScreen nav={navigation} />

  );
}
function createproduct({ navigation }) {
  return (
    <CreateProductScreen nav={navigation} />

  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView style={drawer.self} {...props}>
      <View style={{
        height: page.height / 7,
        backgroundColor: page_color._5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -10,
      }}
      >
        <Text style={drawer.nameText}> {Auth.name.charAt(0).toUpperCase() + Auth.name.slice(1)} {Auth.surname.charAt(0).toUpperCase() + Auth.surname.slice(1)}</Text>
        <Text style={drawer.companyText}> {_Company.name.toUpperCase()}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Çıkış"
        style={drawer.logout}
        onPress={() => {
          Stroage.Remove("UserMail");
          Stroage.Remove("UserPassword");
          Stroage.Set("isLog", "false")
          props.navigation.navigate('Login')
        }}
        icon={({ focused, color, size }) => (
          <Icon name="md-log-out-outline" style={{ fontSize: size, color: 'red' }} />
        )}

      />
    </DrawerContentScrollView>
  );
}

function _Drawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} initialRouteName="Home">
      <Drawer.Screen name="Home" component={home} options={{
        drawerLabel: 'Ana sayfa',
        drawerIcon: ({ focused, color, size }) => (
          <Icon name="home-outline" style={{ fontSize: size, color: color }} />
        ),
      }} />
      <Drawer.Screen name="Profile" component={profile} options={{
        drawerLabel: 'Profil',
        drawerIcon: ({ focused, color, size }) => (
          <Icon name="person-outline" style={{ fontSize: size, color: color }} />
        ),
      }} />
      <Drawer.Screen name="Company" component={company} options={{
        drawerLabel: 'Firma',
        drawerIcon: ({ focused, color, size }) => (
          <Icon name="ios-construct-outline" style={{ fontSize: size, color: color }} />
        ),
      }} />
    </Drawer.Navigator>
  );
}


export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <NavigationContainer >
        <Stack.Navigator >
          <Stack.Screen
            options=
            {{
              headerShown: false
            }}
            name="First"
            component={first}
          />
          <Stack.Screen options={{
            headerShown: false
          }} name="Login" component={login} />

          <Stack.Screen options={{
            headerShown: false
          }}
            name="Welcome" component={welcome} />
          <Stack.Screen options={{
            headerShown: false
          }}
            name="Product" component={product} />
          <Stack.Screen
            name="Drawer"
            component={_Drawer}

            options={{
              headerShown: false,

            }}
          />
          <Stack.Screen options={{
            headerShown: false
          }}
            name="Order" component={order} />

          <Stack.Screen
            options=
            {{
              headerShown: false
            }}
            name="ForgotPassword"
            component={forgotPassword}
          />
          <Stack.Screen
            options=
            {{
              headerShown: false
            }}
            name="createProduct"
            component={createproduct}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export { Navigation, Stack }

const drawer = StyleSheet.create({
  self: {
    backgroundColor: '#ECE9E9',
  },
  profile: {
    height: page.height / 7,
    backgroundColor: page_color._5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,

    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,

  },
  nameText: {
    marginTop: -10,
    fontSize: 20,
    color: 'white'
  },
  companyText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold'
  },
  logout: {
    backgroundColor: '#FFD1D1',
    fontWeight: 'bold',
    flex: 1,
    marginBottom: 0,
    justifyContent: 'flex-end',
    flexDirection: 'column-reverse',

  }

});