import React from 'react'
import PropTypes from 'prop-types'

import CompanyProfile from './company'

const _CompanyScreen = () => <CompanyProfile/>

_CompanyScreen.navigationOptions = () => ({
  header: null,
})

_CompanyScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export { _CompanyScreen}
