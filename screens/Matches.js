// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import FotbalovyZapas from './scripts/ShowMatch.js';

export default function Matches(ligid) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log('Scraping...');
      try {
        const { data } = await axios.get(
          'https://int.soccerway.com/'
        );
        const $ = cheerio.load(data);
        const leagueElements = $('.livescores-comp');
        const matchesElements = $('.livescores-comp .livescore_match');

        const scrapedData = [];
        const leagueData = [];

        leagueElements.each((index, element) => {
          const league = {
            name: $(element).find('.comp-name').text(),
            ligaid: $(element).find('a').attr('href').split('/')[2] + " - " + $(element).find('a').attr('href').split('/')[3],
          }
          leagueData.push(league);

        })

        console.log(leagueData);

        matchesElements.each((index, element) => {
          const match = {
            link: $(element).find('.matchinfo .teams a').attr('href'),
            liga: $(element).find('.matchinfo .teams a').attr('href').split('/')[5] + " - " + $(element).find('.matchinfo .teams a').attr('href').split('/')[6],
            cas: $(element).find('.timebox time').text().trim(),
            logo_domaci: $(element).find('.matchinfo .teams .team_a .team_name img').attr('src'),
            domaci: $(element).find('.matchinfo .teams .team_a').text().trim(),
            logo_hoste: $(element).find('.matchinfo .teams .team_b .team_name img').attr('src'),
            hoste: $(element).find('.matchinfo .teams .team_b').text().trim(),
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