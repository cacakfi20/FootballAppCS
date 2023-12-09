// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import FotbalovyZapas from '../scripts/ShowMatch.js';

export default function Matches() {
  const [matches, setMatches] = useState([]);

  async function fetchData() {
    console.log('Scraping...');
    try {
      const { data } = await axios.get(
        'https://uk.soccerway.com'
      );
      const $ = cheerio.load(data);
      const matchesElements = $('.livescores-comp .livescore_match');

      const scrapedData = [];

      matchesElements.each((index, element) => {
        const match = {
          link: $(element).find('.matchinfo .teams a').attr('href'),
          liga: $(element).find('.matchinfo .teams a').attr('href').split('/')[5] + " - " + $(element).find('.matchinfo .teams a').attr('href').split('/')[6],
          cas: $(element).find('.timebox time').text().trim(),
          logo_domaci: $(element).find('.matchinfo .teams .team_a .team_name img').attr('src').replace("30x30", "150x150"),
          domaci: $(element).find('.matchinfo .teams .team_a').text().trim(),
          skore_domaci: $(element).find('.scores .score_a span.team_score').text().trim(),
          logo_hoste: $(element).find('.matchinfo .teams .team_b .team_name img').attr('src').replace("30x30", "150x150"),
          hoste: $(element).find('.matchinfo .teams .team_b').text().trim(),
          skore_hoste: $(element).find('.scores .score_b span.team_score').text().trim(),
        };

        scrapedData.push(match);


      });

      setMatches(scrapedData);
      console.log(scrapedData);
      console.log('done');
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Football App CS</Text>
      <ScrollView style={styles.scrollView}>
        {matches.map((zapas, index) => (
            <FotbalovyZapas key={index} zapas={zapas} />
        ))}
      </ScrollView>
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