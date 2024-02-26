import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useEffect, useState } from 'react';
import Menu from './components/menu.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home.js';
import Search from './screens/Search.js';
import Matches from './screens/Matches.js';
import BeforeMatch from './screens/BeforeMatch.js'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
        <Stack.Screen name="Matches" component={Matches} options={{ headerShown: false }}/>
        <Stack.Screen name="BeforeMatch" component={BeforeMatch} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
