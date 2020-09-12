import React from 'react';
import {
  Dimensions,
} from 'react-native';

import {  page } from './src/configure';
import Navigation from './src/navigation/Navigation'


const { width, height } = Dimensions.get('window')

const App = () => {
  page.width = width
  page.height = height
  return (
    <Navigation></Navigation>
  );
};

export default App;
