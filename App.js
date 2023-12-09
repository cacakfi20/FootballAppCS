import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Matches from './screens/Matches.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Matches" component={Matches} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}