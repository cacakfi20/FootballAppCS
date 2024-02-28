import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Menu from '../components/menu.js';
import League from '../components/league.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Player from '../components/player.js';


export default function PlayedMatch(item) {
  const navigation = useNavigation();

  const [homeStartPlayers, setHomeStartPlayers] = useState([]);
  const [awayStartPlayers, setAwayStartPlayers] = useState([]);
  const [homeBenchPlayers, setHomeBenchPlayers] = useState([]);
  const [awayBenchPlayers, setAwayBenchPlayers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [bold, setBold] = useState(true);
  const [selectedButton, setSelectedButton] = useState('prehled');

  const handlePrehledPress = () => {
    setBold(true);
    setSelectedButton('prehled')
  }

  const handleSestavyPress = () => {
    setBold(true);
    setSelectedButton('sestavy');
  }

  async function fetchData() {
    console.log('Scraping...');

    try {
        const { data } = await axios.get('https://int.soccerway.com' + item.route.params.link);
        const $ = cheerio.load(data);
        const homeStartPlayers = $('.combined-lineups-container .left table:not(.substitutions) tr');

        const scrapedHomeStartData = [];

        homeStartPlayers.each((index, element) => {
            const homeStartPlayer = {
                name: $(element).find('.player a').text().trim(),
                shirtNumber: $(element).find('.shirtnumber').text().trim(),
                bookingLink: 'https://int.soccerway.com' + $(element).find('.bookings img').attr('src'),
                bookingMinute: $(element).find('.bookings span').text().trim()
            };

            scrapedHomeStartData.push(homeStartPlayer);

        });
        setHomeStartPlayers(scrapedHomeStartData);

        const awayStartPlayers = $('.combined-lineups-container .right table:not(.substitutions) tr');
        const scrapedAwayStartData = [];

        awayStartPlayers.each((index, element) => {
            const awayStartPlayer = {
                name: $(element).find('.player a').text().trim(),
                shirtNumber: $(element).find('.shirtnumber').text().trim(),
                bookingLink: $(element).find('.bookings img').attr('src'),
                bookingMinute: $(element).find('.bookings span').text().trim()
            };

            scrapedAwayStartData.push(awayStartPlayer);

        });
        setAwayStartPlayers(scrapedAwayStartData);

        const homeBenchPlayers = $('.combined-lineups-container .left .substitutions tr');
        const scrapedHomeBenchData = [];

        homeBenchPlayers.each((index, element) => {
          const homeBenchPlayer = {
            name: $(element).find('.player .substitute-in a').text().trim(),
            shirtNumber: $(element).find('.shirtnumber').text().trim(),
            bookingLink: $(element).find('.bookings img').attr('src'),
            bookingMinute: $(element).find('.bookings span').text().trim()
          };
          scrapedHomeBenchData.push(homeBenchPlayer);
        })

        console.log(scrapedHomeBenchData);
        setHomeBenchPlayers(scrapedHomeBenchData);

        const awayBenchPlayers = $('.combined-lineups-container .right .substitutions tr');
        const scrapedAwayBenchData = [];

        awayBenchPlayers.each((index, element) => {
          const awayBenchPlayer = {
            name: $(element).find('.player .substitute-in a').text().trim(),
            shirtNumber: $(element).find('.shirtnumber').text().trim(),
            bookingLink: $(element).find('.bookings img').attr('src'),
            bookingMinute: $(element).find('.bookings span').text().trim()
          };
          scrapedAwayBenchData.push(awayBenchPlayer);
        })
        setAwayBenchPlayers(scrapedAwayBenchData);

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
                <View style={styles.home_team_column}>
                <Image style={styles.logo_home} source={{uri: item.route.params.logo_domaci}}></Image>
                <Text style={styles.home_team}>{item.route.params.domaci}</Text>
                </View>
                <View  style={styles.info_column}>
                <Text style={styles.time}>{item.route.params.cas}</Text>
                <View style={styles.scoreboard}>
                    <Text style={styles.home_score}>{item.route.params.skore_domaci}</Text>
                    <Text style={styles.dash}>-</Text>
                    <Text style={styles.away_score}>{item.route.params.skore_hoste}</Text>
                </View>
                </View>
                <View style={styles.away_team_column}>
                <Image style={styles.logo_away} source={{uri: item.route.params.logo_hoste}}></Image>
                <Text style={styles.away_team}>{item.route.params.hoste}</Text>
                </View>
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
                <ScrollView style={{width: '100%',height: 500, backgroundColor: '#100E21'}}>
                  <Text style={styles.label}>Základní sestava</Text>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <View style={styles.homeTeam}>
                        {homeStartPlayers.map((hrac, index) => (
                            <Player key={index} hrac={hrac} />
                        ))}
                      </View>
                      <View style={styles.awayTeam}>
                        {awayStartPlayers.map((hrac, index) => (
                            <Player key={index} hrac={hrac} />
                        ))}
                      </View>
                  </View>
                  <Text style={styles.label}>Náhradníci</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={styles.homeTeam}>
                          {homeBenchPlayers.map((hrac, index) => (
                            <Player key={index} hrac={hrac} />
                          ))}
                        </View>
                        <View style={styles.awayTeam}>
                          {awayBenchPlayers.map((hrac, index) => (
                            <Player key={index} hrac={hrac} />
                          ))}
                        </View>
                  </View>
                </ScrollView>
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
        height: 750
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
    scoreboard:{
        dispaly: 'flex',
        flexDirection: 'row'
    },
    logo_home:{
      width: '65%',
      height: '45%',
      marginLeft: 40
    },
    logo_away:{
      width: '65%',
      height: '45%',
      marginRight: 40
  },
    home_team: {
      color: 'white',
      fontSize: 15,
      marginTop: 20,
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
      position: 'relative',
      bottom: 30
    },
    dash:{
      color: 'white',
      fontSize: 40,
      paddingBottom: 50,
      fontWeight: 'bold'
    },
    home_score:{
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        position: 'relative',
        right: 5    
    },
    away_score:{
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        position: 'relative',
        left: 5
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
      height: '70',
      width: '50%',
      justifyContent: 'center',
      borderLeftWidth: 1,
      borderLeftColor: 'black'
    },
    sestavy_text:{
      paddingLeft: 60,
      fontSize: 20,
      color: 'white'
    },
    label: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 15
    },
    homeTeam:{
        width: '50%',
    },
    awayTeam: {
        width: '50%'
    }
});