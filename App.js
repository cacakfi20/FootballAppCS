// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import FotbalovyZapas from './scripts/ShowMatch.js';

export default function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log('Scraping...');
      try {
        const { data } = await axios.get(
          'https://www.skysports.com/football-fixtures'
        );
        const $ = cheerio.load(data);
        const matchesElements = $('.fixres__item .matches__item');

        const scrapedData = [];

        matchesElements.each((index, element) => {
          const rowData = {
            cas: $(element).find('span.matches__date').text().trim(),
            domaci: $(element).find('span.matches__participant--side1').text().trim(),
            hoste: $(element).find('span.matches__participant--side2').text().trim(),
          };

          if (rowData.den !== '') {
            scrapedData.push(rowData);
          }
        });

        setMatches(scrapedData);
        console.log(scrapedData);
        console.log('done');
      } catch (error) {
        console.log('error', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Football App CS</Text>
      <ScrollView style={styles.scrollView}>
        {matches.map((zapas, index) => (
          <FotbalovyZapas key={index} zapas={zapas} />
        ))}
      </ScrollView>
      <Text>2023/24</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100E21',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
});
