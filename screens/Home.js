import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useEffect, useState } from 'react';
import Menu from '../components/menu.js';
import LeagueRow from '../components/leagueRow.js';
import DateBar from '../components/dateBar.js';


export default function Home({navigation}) {
  const [todayDataLeagues, setTodayDataLeagues] = useState(null);

  async function fetchData() {
    console.log('Scraping...');
    try {
      const { data } = await axios.get(
        'https://int.soccerway.com/matches/2024/02/25/'
      );
      const $ = cheerio.load(data);
      const leagueElements = $('.livescores-comp');
      const leagueData = [];
      let i = 0;

      leagueElements.each((index, element) => {
        if (i < 10) {
          const league = {
            name: $(element).find('.comp-name').text(),
            ligaid: $(element).find('a').attr('href').split('/')[2] + " - " + $(element).find('a').attr('href').split('/')[3],
            flag: 'https://int.soccerway.com' + $(element).find('.country-flag').attr('src'),
          }
          leagueData.push(league);
        } 
        i=i+1;
      })
      console.log(leagueData);
      setTodayDataLeagues(leagueData);
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
      <DateBar nav={navigation}/>
      <View>
        <Text style={styles.text}>Dnešní zápasy</Text>
        <ScrollView style={{width: '100%', height:'100%'}}>
          {todayDataLeagues && todayDataLeagues.map((item, index) => (
            <LeagueRow key={index} nav={navigation} index={index} item={item}></LeagueRow>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#100E21',
  },
  text: {
    color:'white', 
    textAlign:'center', 
    marginBottom:'10%', 
    fontSize:20, 
    fontWeight:'700'
  }
});
