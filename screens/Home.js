import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useEffect, useState } from 'react';
import Menu from '../components/menu.js';
import LeagueRow from '../components/leagueRow.js';
import DateBar from '../components/dateBar.js';

export default function Home({navigation}) {
  const [todayDataLeagues, setTodayDataLeagues] = useState(null);
  let dnes = new Date();
  let linkMesic = (dnes.getMonth() + 1).toString().padStart(2, '0');
  let linkDen = (dnes.getDate()).toString().padStart(2, '0');
  let linkDatum = `${linkMesic}/${linkDen}/`;
  const url = 'https://int.soccerway.com/matches/2024/' + linkDatum;

  const [selectedUrl, setSelectedUrl] = useState(url);

  async function fetchData() {
    console.log('Scraping...');
    try {
      const { data } = await axios.get(selectedUrl);
      const $ = cheerio.load(data);
      const leagueElements = $('.livescores-comp');
      const leagueData = [];

      const leagueOfIntrest = [
        'england - premier-league', 
        'england - fa-cup',
        'england - championship',
        'england - league-cup', 
        'europe - eufa-cup',
        'europe - uefa-europa-conference-league',
        'europe - uefa-champions-league',
        'europe - uefa-cup',
        'france - ligue-1', 
        'france - coupe-de-france',
        'germany - bundesliga', 
        'italy - serie-a', 
        'spain - primera-division', 
        'spain - copa-del-rey',
        'netherlands - eredivisie', 
        'portugal - portuguese-liga-',
      ]

      leagueElements.each((index, element) => {
        const leagueid = $(element).find('a').attr('href').split('/')[2] + " - " + $(element).find('a').attr('href').split('/')[3];
        if (leagueOfIntrest.includes(leagueid.trim()))
        {
          const league = {
            name: $(element).find('.comp-name').text(),
            ligaid: $(element).find('a').attr('href').split('/')[2] + " - " + $(element).find('a').attr('href').split('/')[3],
            flag: 'https://int.soccerway.com' + $(element).find('.country-flag').attr('src'),
            leagueURL: 'https://int.soccerway.com' + $(element).find('h2 a').attr('href')
          }
          leagueData.push(league);
        }
      })
      setTodayDataLeagues(leagueData);
      console.log('done');
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedUrl]);

  return (
    <View style={styles.container}>
      <Menu nav={navigation}/>
      <DateBar setSelectedUrl={setSelectedUrl}/>
      <View>
        <Text style={styles.text}>Dnešní zápasy</Text>
        <ScrollView style={{width: '100%', height: 570}}>
          {todayDataLeagues && todayDataLeagues.map((item, index) => (
            <LeagueRow key={index} nav={navigation} index={index} item={item} selectedUrl={selectedUrl}></LeagueRow>          
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
