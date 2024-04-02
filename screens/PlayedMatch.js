import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Menu from '../components/menu.js';
import League from '../components/league.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Player from '../components/player.js';
import GoalScorer from '../components/goalScorer.js';
import { ActivityIndicator } from "react-native";


export default function PlayedMatch(item) {
  const itemky = item
  const navigation = useNavigation();

  const [homeStartPlayers, setHomeStartPlayers] = useState([]);
  const [awayStartPlayers, setAwayStartPlayers] = useState([]);
  const [homeBenchPlayers, setHomeBenchPlayers] = useState([]);
  const [awayBenchPlayers, setAwayBenchPlayers] = useState([]);
  const [goalScorer, setGoalScorers] = useState([]);
  const [link, setLink] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [bold, setBold] = useState(true);
  const [selectedButton, setSelectedButton] = useState('prehled');
  var selectedOption = 'prehled';

  const handlePrehledPress = () => {
    setBold(true);
    setSelectedButton('prehled');
    selectedOption = 'prehled';
    fetchData();
  }

  const handleSestavyPress = () => {
    setBold(true);
    setSelectedButton('sestavy');
    selectedOption = 'sestavy';
    fetchData();
  }

  const handleTeamPress = (link, itemky) => {
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
       
        if (selectedOption == 'prehled')
        {
          console.log('prehled');
          const goalScorers = $('.content .block_match_goals .scorer-info li');

          const scrapedGoalScorerData = [];

          goalScorers.each((index, element) => {
            const goalScorerHomePlayer = {
              name: $(element).find('.scorer:nth-child(1) > a').text().trim(),
              assist: $(element).find('.scorer:nth-child(1) span a').text().trim(),
              minute: $(element).find('.minute:nth-child(2)').text().trim(),
              image: 'https://int.soccerway.com/media/v2.8.1/img/events/G.png',
              away: false
            }
            const goalScorerAwayPlayer = {
              name: $(element).find('.scorer:nth-child(3) > a').text().trim(),
              assist: $(element).find('.scorer:nth-child(3) span a').text().trim(),
              minute: $(element).find('.minute:nth-child(1)').text().trim(),
              image: 'https://int.soccerway.com/media/v2.8.1/img/events/G.png',
              away: true
            }
            scrapedGoalScorerData.push(goalScorerHomePlayer);
            scrapedGoalScorerData.push(goalScorerAwayPlayer);
          })
          let filteredGoalScorers = scrapedGoalScorerData.filter(goalScorer => goalScorer.name);
          setGoalScorers(filteredGoalScorers);
        }
        if (selectedOption == 'sestavy')
        {
          console.log('sestavy');
          const homeStartPlayers = $('.combined-lineups-container .left table:not(.substitutions) tr');

          const scrapedHomeStartData = [];

          homeStartPlayers.each((index, element) => {
              const homeStartPlayer = {
                  name: $(element).find('.player a').text().trim(),
                  shirtNumber: $(element).find('.shirtnumber').text().trim(),
                  bookingLink: 'https://int.soccerway.com' + $(element).find('.bookings span').attr('src'),
                  bookingMinute: $(element).find('.bookings span').text().trim(),
                  flag: $(element).find('.player a').attr('class')
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
                  bookingLink: 'https://int.soccerway.com' + $(element).find('.bookings img').attr('src'),
                  bookingMinute: $(element).find('.bookings span').text().trim(),
                  flag: $(element).find('.player a').attr('class')
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
              bookingLink: 'https://int.soccerway.com' + $(element).find('.bookings img').attr('src'),
              bookingMinute: $(element).find('.bookings span').text().trim(),
              flag: $(element).find('.player a').attr('class')
            };
            scrapedHomeBenchData.push(homeBenchPlayer);
          })
          setHomeBenchPlayers(scrapedHomeBenchData);

          const awayBenchPlayers = $('.combined-lineups-container .right .substitutions tr');
          const scrapedAwayBenchData = [];

          awayBenchPlayers.each((index, element) => {
            const awayBenchPlayer = {
              name: $(element).find('.player .substitute-in a').text().trim(),
              shirtNumber: $(element).find('.shirtnumber').text().trim(),
              bookingLink: 'https://int.soccerway.com' + $(element).find('.bookings img').attr('src'),
              bookingMinute: $(element).find('.bookings span').text().trim(),
              flag: $(element).find('.player a').attr('class')
            };
            scrapedAwayBenchData.push(awayBenchPlayer);
          })
          setAwayBenchPlayers(scrapedAwayBenchData);
        }
        

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
                  <View style={styles.scoreboard}>
                      <Text style={styles.home_score}>{item.route.params.skore_domaci}</Text>
                      <Text style={styles.dash}>-</Text>
                      <Text style={styles.away_score}>{item.route.params.skore_hoste}</Text>
                  </View>
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
            {selectedButton === 'prehled' && (
              <View id="prehledContent" style={styles.PrehledContent}>
                {goalScorer.map((strelec, index) => (
                  <GoalScorer key={index} goalScorer={strelec} />
                ))}
              </View>
            )}
            {selectedButton === 'sestavy' && (
              <View id="sestavyContent">
                <ScrollView horizontal={false} style={{width: '100%', height: 388, backgroundColor: '#100E21'}}>
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
            )}
        </View>
        );
}



const styles = StyleSheet.create({
  boldText:{
      fontWeight: 'bold'
    },
    container: {
      backgroundColor: '#100E21',
        height: 825
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
      width: '72%',
      height: '45%',
      marginLeft: 40
    },
    logo_away:{
      width: '72%',
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
    },
    PrehledContent:{
      backgroundColor: '#100E21',
      height: '100%',
      display: 'flex',
    },
    homeTeamScorers:{
      width: '100%'
    },
    awayTeamScorers:{
      width: '50%'
    }
});