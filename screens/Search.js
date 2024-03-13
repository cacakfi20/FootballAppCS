import { StyleSheet, TouchableOpacity, TextInput, View, Image, ScrollView, Text } from 'react-native';
import Menu from '../components/menu.js';
import React, { useState } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useEffect } from 'react';


export default function Search({navigation}) {
  const [text, onChangeText] = useState('');
  const [team, setTeam] = useState([]);
  
  var logo = require ('../assets/logo.png');
  var search = require ('../assets/lupa.png');

  const handleLogoPress = () => {
    console.log('Logo Clicked');
    navigation.navigate('Home')
  };

  const handleTeamPress = (url) => {
    console.log(url);
  };

  const handleSearchPress = () => {
    console.log('Search Clicked');
  };
  

  async function fetchData() {
    console.log('Scraping...');
    try {
        newText = text.replace(/\s+/g,"+")
        const { data } = await axios.get('https://int.soccerway.com/search/?q=' + newText + '&module=all');
        const $ = cheerio.load(data);

        const teams = $('.block_search_results_teams .search-results li');

        const scrapedTeamData = [];

        teams.each((index, element) => {
            const teamTable = {
                name: $(element).find('> a').text().trim(),
                nation: $(element).find('> span').text().trim(),
                link: 'https://int.soccerway.com/' + $(element).find('> a').attr('href'),
            }
            scrapedTeamData.push(teamTable);
        });
        setTeam(scrapedTeamData);
        console.log('done')
    } catch (error) {
        console.log('error', error);
    }
  }

  useEffect(() => {
      fetchData();
  }, [text])
  return (
    <View style={styles.container}>
      <View style={styles.MenuContainer}>
        <TouchableOpacity onPress={() => handleLogoPress()} style={{marginTop: '2%',width: '20%',height: '100%'}}>
          <Image
            source={logo}
            style={{
              marginTop: '2%',
              width: '100%',
              height: '100%',
            }}
          ></Image>
        </TouchableOpacity>
        <TextInput 
            value={text}
            style={styles.textInput}
            onChangeText={onChangeText}
          />
      </View>
      <ScrollView>
        {team.map((tym, index) => (
            <TouchableOpacity onPress={() => handleTeamPress(tym.link)} key={index} style={styles.teamView}>
              <Text style={styles.teamName}>{tym.name}</Text>
              <Text style={styles.teamNation}>{tym.nation}</Text>
            </TouchableOpacity>
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
    MenuContainer: {
      flexDirection: 'row', // Align items horizontally
      justifyContent: 'space-between', // Add space between the images
      marginTop: '8%',
      width: '100%',
      height: '10%',
      backgroundColor: '#100E21',
      borderBottomWidth: 1,
    },
    textInput: {
      color: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      height: 45,
      width: '75%',
      fontSize: 18,
      marginTop: 20,
      marginRight: 20,
      paddingLeft: 8
    },
    teamName: {
      color: 'white',
      marginLeft: 20,
      marginTop: 20,
      fontSize: 20
    },
    teamNation:{
      color: '#b7adad',
      FontSize: 15,
      alignSelf:'flex-end',
      marginBottom: 3,
      marginLeft: 10
    },
    teamView:{
      display: 'flex',
      flexDirection: 'row'
    }
  });