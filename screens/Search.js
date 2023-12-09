import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useEffect, useState } from 'react';
import Menu from '../components/menu.js';


export default function Search({navigation}) {
    return (
    <View style={styles.container}>
      <Menu nav={navigation}/>
      <Text>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#100E21',
      height: '100%',
    },
  });