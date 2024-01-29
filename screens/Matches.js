// App.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import FootballMatch from '../components/footballMatch.js';
import Menu from '../components/menu.js';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from "react-native";

export default function Matches(leagueId) {
  const [matches, setMatches] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const navigation = useNavigation();

  async function fetchData() {
    console.log('Scraping...');
    try {
      const { data } = await axios.get(
        'https://uk.soccerway.com/matches/2024/01/27'
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
      setLoading(false);
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
        <Menu nav={navigation}/>
        {isLoading && <ActivityIndicator color={"#fff"} style={{marginVertical:'50%'}}/>}
        <ScrollView style={styles.scrollView}>
            {matches.map((zapas, index) => (
                <FootballMatch leagueId={leagueId} key={index} zapas={zapas} />
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