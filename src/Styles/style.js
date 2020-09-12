import { StyleSheet } from "react-native"
import mainColor from '../screens/Profiles/commons/constants'
import { page, page_color } from '../configure';

export default StyleSheet.create({
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
      backgroundColor: '#F5F5F5',
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
      fontSize: 25,
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
      fontSize: 30,
      fontWeight: 'bold',
      paddingBottom: 8,
      textAlign: 'center',
    },
    userBioRow: {
      marginLeft: 40,
      marginRight: 40,
    },
    userBioText: {
      color: 'white',
      fontSize: 13.5,
      textAlign: 'center',
    },
    cards: {
      alignItems: 'center',
      backgroundColor: '#F5F5F5'
    },
    card: {

    }
  })