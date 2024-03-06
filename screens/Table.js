import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Menu from '../components/menu.js';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import TableTeam from '../components/tableTeam.js'


export default function Table(info, navigation) {
    const [team, setTeam] = useState([]);

    async function fetchData() {
        console.log('Scraping...');
        try {
            const { data } = await axios.get(info.route.params.leagueURL);
            const $ = cheerio.load(data);

            const teams = $('.detailed-table tbody .team_rank');

            const scrapedTeamData = [];

            teams.each((index, element) => {
                const teamTable = {
                    position: $(element).find('.rank').text().trim(),
                    name: $(element).find('.team a').attr('title'),
                    points: $(element).find('.points').text().trim()
                }
                scrapedTeamData.push(teamTable);
            });
            setTeam(scrapedTeamData);
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
    <View style={styles.container}>
      <Menu nav={navigation}/>
      <View style={styles.league}>
        <View style={styles.imageView}>
            <Image style={styles.image} source={{uri: info.route.params.leagueFlag}}></Image>
        </View>
        <View style={styles.textView}>
            <Text style={styles.name}>{info.route.params.leagueName}</Text>
            <Text style={styles.year}>2023/2024</Text>
        </View>
      </View>
      <Text style={styles.title}>Tabulka</Text>
      <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
        <Text style={{color: 'white', marginLeft: 15, fontSize: 16}}>#</Text>
        <Text style={{color: 'white', flex: 1, marginLeft: 15, fontSize: 16}}>Team</Text>
        <Text style={{color: 'white', fontSize: 16, marginRight: 23}}>P</Text>
      </View>
      <ScrollView>
        {team.map((tym, index) => (
            <TableTeam key={index} tym={tym} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#100E21',
      height: '100%',
    },
    league: {
        height: 100, 
        backgroundColor: '#2B2940',
        display: 'flex',
        flexDirection: 'row'
    },
    image:{
        width: 100,
        height: 50
    },
    name: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10
    },
    year:{
        color: 'white',
        fontSize: 14
    },
    imageView:{
        margin: 25
    },
    textView:{
        marginTop: 25
    },
    title:{
        fontSize: 20,
        color: 'white',
        margin: 30
    }
  });