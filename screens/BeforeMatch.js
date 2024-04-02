import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Menu from '../components/menu.js';
import League from '../components/league.js';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native';


export default function BeforeMatch(item) {
  console.log(item);
  const navigation = useNavigation();
  const [link, setLink] = useState([]);
  const [state, setState] = useState('Přehled zápasu není k dispocizi, utkání ještě nezačalo.');
  const [bold, setBold] = useState(true);
  const [selectedButton, setSelectedButton] = useState('prehled');
  const [isLoading, setLoading] = useState(true);


  const handlePrehledPress = () => {
    setState('Přehled zápasu není k dispocizi, utkání ještě nezačalo.')
    setBold(true);
    setSelectedButton('prehled')
  }

  const handleSestavyPress = () => {
    setState('Sestavy nejsou k dispocizi, utkání ještě nezačalo.')
    setBold(true);
    setSelectedButton('sestavy');
  }
  
  const handleTeamPress = (link) => {
    console.log(link);
    navigation.push('Team', link)
  } 
  async function fetchData() {
    console.log('Scraping...');
    try {
        const { data } = await axios.get('https://int.soccerway.com' + item.route.params.link);
        const $ = cheerio.load(data);

        const links = $('.content .wrapper')

        const scrapedLink = [];
    
        links.each((index, element) => {
          const teamLink = {
            home_link: 'https://int.soccerway.com/' + $(element).find('.left .team-logo').attr('href'),
            away_link: 'https://int.soccerway.com/' + $(element).find('.right .team-logo').attr('href')
          }
          scrapedLink.push(teamLink);
        })
        setLink(scrapedLink);
       
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
            <League leagueID={item} nav={navigation}/>
            <View style={styles.matchInfoContainer}>
            {isLoading && <ActivityIndicator color={"#fff"} style={{marginVertical:'50%'}}/>}
              {link.map(({home_link, away_link}, index) => (
                  <TouchableOpacity key={home_link} onPress={() => handleTeamPress(home_link)} style={styles.home_team_column}>
                    <Image style={styles.logo_home} source={{uri: item.route.params.logo_domaci}}></Image>
                    <Text style={styles.home_team}>{item.route.params.domaci}</Text>
                  </TouchableOpacity>
                ))}
              <View  style={styles.info_column}>
                <Text style={styles.time}>{item.route.params.cas}</Text>
                <Text style={styles.dash}>-</Text>
              </View>
              {link.map(({home_link, away_link}, index) => (
                  <TouchableOpacity key={away_link} onPress={() => handleTeamPress(away_link)} style={styles.away_team_column}>
                    <Image style={styles.logo_away} source={{uri: item.route.params.logo_hoste}}></Image>
                    <Text style={styles.away_team}>{item.route.params.hoste}</Text>
                  </TouchableOpacity>
                ))}
            </View>
            <View style={styles.optionbar}>
              <TouchableOpacity style={styles.prehled} onPress={() => handlePrehledPress()}>
                <View>
                  <Text style={[styles.prehled_text, bold && selectedButton === 'prehled' && styles.boldText]}>Přehled</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sestavy} onPress={() => handleSestavyPress()}>
                <View>
                  <Text style={[styles.sestavy_text, bold && selectedButton === 'sestavy' && styles.boldText]}>Sestavy</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{color: 'white', fontSize: 20, padding: 20}}>{state}</Text>
            </View>
        </View>
      );
}



const styles = StyleSheet.create({
    boldText:{
      fontWeight: 'bold'
    },
    container: {
      backgroundColor: '#100E21',
      height: '100%'
    },
    matchInfoContainer: {
      alignItems: "center",
      height: '25%',
      dispaly: 'flex',
      flexDirection: 'row',
      width: '100%'
    },
    home_team_column:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    away_team_column:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    info_column:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo_home:{
      width: '65%',
      height: '40%',
      marginLeft: 40
    },
    logo_away:{
      width: '65%',
      height: '40%',
      marginRight: 40
  },
    home_team: {
      color: 'white',
      fontSize: 15,
      marginTop: 20,
      textAlign: 'center',
      marginLeft: 40
    },
    away_team: {
      color: 'white',
      fontSize: 15,
      marginTop: 20,
      marginRight: 40
    },
    time:{
      color: '#9E9E9E',
    },
    dash:{
      color: 'white',
      fontSize: 100,
      paddingBottom: 50,
      fontWeight: 'bold'
    },
    optionbar:{
      display: 'flex',
      flexDirection: 'row',
    },
    prehled:{
      backgroundColor: '#2B2940',
      height: 70,
      width: '50%',
      justifyContent: 'center',
      borderRightColor: 'black',
      borderRightWidth: 1,
    },
    prehled_text:{
      paddingLeft: 60,
      fontSize: 20,
      color: 'white',
    },
    sestavy:{
      backgroundColor: '#2B2940',
      height: 70,
      width: '50%',
      justifyContent: 'center',
      borderLeftWidth: 1,
      borderLeftColor: 'black'
    },
    sestavy_text:{
      paddingLeft: 60,
      fontSize: 20,
      color: 'white'
    }
});