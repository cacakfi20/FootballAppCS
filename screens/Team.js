import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import TableTeam from '../components/tableTeam';
import Menu from '../components/menu'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as cheerio from 'cheerio';

export default function Team(leagueLink) {
    console.log(leagueLink);
    const navigation = useNavigation()
    const [finishedMatches, setFinishedMatches] = useState([]);
    const [upcommingMatches, setUpcommmingMatches] = useState([]);
    const [players, setPlayers] = useState([]);
    const [team, setTeam] = useState([]);
    const [table, setTable] = useState([]);
    const [current, setCurrent] = useState('Výsledky')
    const [bold, setBold] = useState(true)

    const handleMatchBeforePress = (zapas) => {
        console.log(zapas)
        navigation.push('BeforeMatch', {
            leagueId: zapas.link.split('/')[5] + '-' + zapas.link.split('/')[6],
            leagueName: zapas.leagueName,
            leagueFlag: 'https://int.soccerway.com/media/v2.8.1/img/flags/24x24/plain/' + zapas.link.split('/')[5] + '.png',
            logo_domaci: zapas.domaci_logo,
            logo_hoste: zapas.hoste_logo,
            domaci: zapas.domaci,
            hoste: zapas.hoste,
            cas: zapas.cas,
            leagueURL: 'https://int.soccerway.com/national' + '/' + zapas.link.split('/')[5] + '/' + zapas.link.split('/')[6],
            link: zapas.link
        })
    }

    const handlePlayedMatchPress = (zapas) => {
        console.log(zapas)
        navigation.push('PlayedMatch', {
            leagueId: zapas.link.split('/')[5] + '-' + zapas.link.split('/')[6],
            leagueName: zapas.leagueName,
            leagueFlag: 'https://int.soccerway.com/media/v2.8.1/img/flags/24x24/plain/' + zapas.link.split('/')[5] + '.png',
            logo_domaci: zapas.domaci_logo,
            logo_hoste: zapas.hoste_logo, 
            domaci:zapas.domaci, 
            hoste:zapas.hoste, 
            cas:zapas.cas, 
            skore_domaci:zapas.domaci_skore, 
            skore_hoste: zapas.hoste_skore,
            link: zapas.link,
            leagueURL: 'https://int.soccerway.com/national' + '/' + zapas.link.split('/')[5] + '/' + zapas.link.split('/')[6],
            nav: navigation
        })
    }

    const handleVysledkyPress = () => {
        setCurrent('Výsledky');
        setBold(true);
    }

    const handleProgramPress = () => {
        setCurrent('Program');
        setBold(true);
    }
    const handleTabulkaPress = () => {
        setCurrent('Tabulka');
        setBold(true);
    }
    const handleSoupiskaPress = () => {
        setCurrent('Soupiska');
        setBold(true);
    }

    async function scrapeSquad() {
        console.log('Scraping squad...')

        try {   
            const link = leagueLink.route.params;
            const { data } = await axios.get(link)
            const $ = cheerio.load(data)
            const squadElements = $('.squad-container .squad tbody tr td div')
            return squadElements;

        } catch (error) {
            return 0;
            console.log(error)
        }
    }

    async function scrapeTable() {
        console.log('Scraping squad..')

        try {   
            const link = leagueLink.route.params;
            const { data } = await axios.get(link)
            const $ = cheerio.load(data)
            const squadElements = $('.block_team_table-wrapper div .block_team_table table tbody tr')
            return squadElements;

        } catch (error) {
            return 0;
            console.log(error)
        }
    }

    async function scrapeTeamInfo() {
        console.log('Scraping squad.')

        try {   
            const link = leagueLink.route.params;
            const { data } = await axios.get(link)
            const $ = cheerio.load(data)
            const teamElements = $('#doc4 #bd')
            return teamElements;

        } catch (error) {
            return 0;
            console.log(error)
        }
    }

    async function fetchFinishedData() {
        console.log('Scraping');
        
        try {
            const finishedLink = leagueLink.route.params+'matches/';
            const { data } = await axios.get(finishedLink);
            const $ = cheerio.load(data)
            const matchesElements = $('.table-container .matches .match');
            const squadElements = await scrapeSquad()
            const teamElements = await scrapeTeamInfo()
            const tableElements = await scrapeTable()
                       
            const scrapedData = [];
            const scrapedUpData = [];
            const squad = [];
            const team_info = [];
            const table = [];

            teamElements.each((index, element) => {
                const info = {
                    name: $(element).find('#subheading h1').text().trim(),
                    logo: $(element).find('.logo img').attr('src').trim()
                }
                team_info.push(info)
            })
            setTeam(team_info)

            tableElements.each((index, element) => {
                const info = {
                    class: $(element).attr('class').trim(),
                    position: $(element).find('.rank').text().trim(),
                    name: $(element).find('.team').text().trim(),
                    points: $(element).find('.points').text().trim(),
                    mp: $(element).find('.mp').text().trim(),
                    link: 'https://int.soccerway.com/' + $(element).find('.team a').attr('href'),
                    logo: 'https://secure.cache.images.core.optasports.com/soccer/teams/150x150/' + $(element).find('.team a').attr('href').split('/')[4] + '.png',
                }
                console.log(info)
                table.push(info)
            })
            setTable(table)

            squadElements.each((index, element) => {
                const team = {
                    flags: $(element).find('span').attr('class'),
                    players: $(element).find('a').text().trim()
                }
                if (team.players && team.flags) {
                    squad.push(team)
                }
            })
            const playerList = squad.length > 0 && squad[0].players ? squad[0].players.split(/(?=[A-Z])/).filter(Boolean) : [];
            const pairedPlayers = [];
            for (let i = 0; i < playerList.length; i += 2) {
                pairedPlayers.push(playerList[i] + (playerList[i + 1] ? playerList[i + 1] : ""));
            }
            setPlayers(squad)

            matchesElements.each((index, element) => {
                var score = $(element).find('.score-time').text().trim()
                score = score.replace(/[^\d:-]/g, '')
                
                if (score.includes(':')) {
                    const domaci_url = $(element).find('.team-a a').attr('href').split('/')
                    const hoste_url = $(element).find('.team-b a').attr('href').split('/')
    
                    const logo_domaci = 'https://secure.cache.images.core.optasports.com/soccer/teams/150x150/'+domaci_url[4]+'.png'
                    const logo_hoste = 'https://secure.cache.images.core.optasports.com/soccer/teams/150x150/'+hoste_url[4]+'.png'
    
                    const match = {
                        domaci: $(element).find('.team-a a').text().trim(),
                        hoste: $(element).find('.team-b a').text().trim(),
                        domaci_logo: logo_domaci,
                        leagueName: $(element).find('.competition a').attr('title'),
                        hoste_logo: logo_hoste,
                        cas: score,
                        link: $(element).find('.score-time a').attr('href')
                    };
                    scrapedUpData.push(match);
                } else {
                    const score_arr = score.split('-')

                    const domaci_url = $(element).find('.team-a a').attr('href').split('/')
                    const hoste_url = $(element).find('.team-b a').attr('href').split('/')
    
                    const logo_domaci = 'https://secure.cache.images.core.optasports.com/soccer/teams/150x150/'+domaci_url[4]+'.png'
                    const logo_hoste = 'https://secure.cache.images.core.optasports.com/soccer/teams/150x150/'+hoste_url[4]+'.png'
    
                    const match = {
                        domaci: $(element).find('.team-a a').text().trim(),
                        hoste: $(element).find('.team-b a').text().trim(),
                        domaci_logo: logo_domaci,
                        hoste_logo: logo_hoste,
                        leagueName: $(element).find('.competition a').attr('title'),
                        domaci_skore: score_arr[0],
                        hoste_skore:score_arr[1],
                        link: $(element).find('.score a').attr('href')
                    };
                    scrapedData.push(match);
                }
            });
            setFinishedMatches([...scrapedData].reverse());
            setUpcommmingMatches(scrapedUpData)
            console.log('done');
        } catch (error) {
            console.log('error', error);
        }
      }
    
      useEffect(() => {
            fetchFinishedData();
      }, []);
      console.log(bold, current);
    return (
        <View style={styles.container}>
            <Menu nav={navigation}/>
            {team[0] &&(
                <View style={{height:'15%', backgroundColor:'#2B2940'}}>
                    <Image style={{top:35, left: 20, position:'absolute', width: '15%',height: '50%'}} source={{uri: team[0].logo}}></Image>
                    <Text style={{color:'white', fontSize:25, textAlign:'center', top:50, fontWeight: 'bold', left: 20}}>{team[0].name}</Text> 
                </View>
            )}
            <View style={styles.submenu}>
                <TouchableOpacity style={{width:'25%', paddingTop:'5%', paddingBottom:'5%'}} onPress={() => handleVysledkyPress() }>
                    <View>
                        <Text style={[styles.text, bold && current === 'Výsledky' && styles.boldText]}>Výsledky</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'25%', paddingTop:'5%', paddingBottom:'5%'}} onPress={() => handleProgramPress()}>
                    <View>
                        <Text style={[styles.text, bold && current === 'Program' && styles.boldText]}>Program</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'25%', paddingTop:'5%', paddingBottom:'5%'}} onPress={() => handleTabulkaPress()}>
                    <View>
                        <Text style={[styles.text, bold && current === 'Tabulka' && styles.boldText]}>Tabulka</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'25%', paddingTop:'5%', paddingBottom:'5%'}} onPress={() => handleSoupiskaPress()}>
                    <View>
                        <Text style={[styles.text, bold && current === 'Soupiska' && styles.boldText]}>Soupiska</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {current === 'Výsledky' && (
                <ScrollView style={styles.scrollView}>
                    {finishedMatches.map((zapas, index) => (
                        <TouchableOpacity key={index} style={matchesStyle.container} onPress={() => handlePlayedMatchPress(zapas)}>
                            <View style={{display: 'flex', flexDirection: "row"}}>
                                <Image style={matchesStyle.logo_home} source={{uri: zapas.domaci_logo}}></Image>
                                <Text style={matchesStyle.home_team}>{zapas.domaci}</Text>
                            </View>
                            <View>
                                {!zapas.domaci_skore && (
                                    <Text style={matchesStyle.presunuto}>PSTP</Text>
                                )}
                                <Text style={matchesStyle.skore_domaci}>{zapas.domaci_skore}</Text>
                                <Text style={matchesStyle.skore_hoste}>{zapas.hoste_skore}</Text>
                            </View>
                            <View style={{display: 'flex', flexDirection: "row", height: 35}}>
                                <Image style={matchesStyle.logo_away} source={{uri: zapas.hoste_logo}}></Image>
                                <Text style={matchesStyle.away_team}>{zapas.hoste}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            {current === 'Program' && (
                <ScrollView style={styles.scrollView}>
                    {upcommingMatches.map((zapas, index) => (
                        <TouchableOpacity key={index} style={matchesStyle.container} onPress={() => handleMatchBeforePress(zapas)}>
                            <View style={{display: 'flex', flexDirection: "row"}}>
                                <Image style={matchesStyle.logo_home} source={{uri: zapas.domaci_logo}}></Image>
                                <Text style={matchesStyle.home_team}>{zapas.domaci}</Text>
                            </View>
                            <Text style={matchesStyle.time}>{zapas.cas}</Text>
                            <View style={{display: 'flex', flexDirection: "row", height: 35}}>
                                <Image style={matchesStyle.logo_away} source={{uri: zapas.hoste_logo}}></Image>
                                <Text style={matchesStyle.away_team}>{zapas.hoste}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            {current === 'Tabulka' && (
                <ScrollView style={styles.scrollView}>
                    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
                        <Text style={{color: 'white', marginLeft: 15, fontSize: 16}}>#</Text>
                        <Text style={{color: 'white', flex: 1, marginLeft: 15, fontSize: 16}}>Team</Text>
                        <Text style={{color: 'white', fontSize: 16, marginRight: 31}}>Z</Text>
                        <Text style={{color: 'white', fontSize: 16, marginRight: 23}}>P</Text>
                    </View>
                    {table.map((t, index) => (
                        <View style={t.class.includes('highlight') ? {backgroundColor: '#2B2940'} : {}}>
                            <TableTeam key={index} tym={t} />
                        </View>
                    ))}
                </ScrollView>
            )}
            {current === 'Soupiska' && (
                <ScrollView style={styles.scrollView}>
                    {players.map((player, index) => (
                        <View key={index} style={{width:'100%', borderBottomColor:'grey', borderBottomWidth:'1', paddingTop:'5%', paddingBottom:'5%', paddingLeft:'5%', display:'flex'}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
                                <Image 
                                    style={{ width: 23, height: 20, marginRight: 10 }} // Added marginRight for spacing
                                    source={{ uri: 'https://int.soccerway.com/media/v2.8.1/img/flags/24x24/plain/' + player.flags.split(' ')[2].replace("_16_right", "") + '.png' }}
                                />
                                <Text style={{ color: 'white', fontSize: 20 }}>
                                    {player.players}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor: '#100E21',
        color: 'white',
    },
    text: {
        color: 'white',
        textAlign:'center',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    submenu: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:'1px',
        borderBottomColor:'grey'
    },
    boldText:{
        fontWeight: 'bold',
    }
  });

  const matchesStyle = StyleSheet.create({
    container: {
      height: 135,
      borderTopWidth: 1,
      borderColor: '#494949',
    },
    logo_home:{
      position: 'absolute',
      left: 20,
      width: '9%',
      height: '78%',
      top: 20
    },
    logo_away:{
      position: 'absolute',
      left: 20,
      width: '9%',
      height: '100%',
      top: -5
  },
    home_team: {
      color: 'white',
      paddingTop: 26,
      paddingLeft: 65,
      fontSize: 16,
    },
    away_team: {
      color: 'white',
      paddingTop: 5,
      paddingLeft: 65,
      fontSize: 16,
    },
    time:{
      paddingLeft: 300,
      paddingTop: 15,
      color: 'white',
    },
    skore_domaci:{
      color: 'white',
      marginLeft: 315,
      position: 'relative',
      bottom: 15,
      fontSize: 15
  
    },
    skore_hoste:{
      color: 'white',
      marginLeft: 315,
      position: 'relative',
      top: 25,
      fontSize: 15
    },
    button: {
      width: '100%',
      height: '100%',
    },
    presunuto: {
        color: 'white',
        marginLeft: 315,
        position: 'absolute',
        bottom: 0,
        right:70,
        fontSize: 15,
    },
    time:{
        paddingLeft: 300,
        paddingTop: 15,
        color: 'white',
    },
  });