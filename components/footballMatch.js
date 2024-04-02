import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';

const FootballMatch = ({ zapas, leagueId, nav }) => {
    const handleMatchBeforePress = () => {
      nav.push('BeforeMatch', {
          leagueId:leagueId.route.params.leagueId, 
          leagueName:leagueId.route.params.leagueName, 
          leagueFlag:leagueId.route.params.leagueFlag, 
          logo_domaci:zapas.logo_domaci, 
          logo_hoste:zapas.logo_hoste, 
          domaci:zapas.domaci, 
          hoste:zapas.hoste, 
          cas:zapas.cas,
          leagueURL: leagueId.route.params.leagueURL,
          link: zapas.link,
        });
      };
    const handleMatchPlayingPress = () => {
        nav.push('PlayedMatch', {
          leagueId:leagueId.route.params.leagueId,
          leagueName:leagueId.route.params.leagueName, 
          leagueFlag:leagueId.route.params.leagueFlag, 
          logo_domaci:zapas.logo_domaci, 
          logo_hoste:zapas.logo_hoste, 
          domaci:zapas.domaci, 
          hoste:zapas.hoste, 
          cas:zapas.cas, 
          skore_domaci:zapas.skore_domaci, 
          skore_hoste: zapas.skore_hoste,
          link: zapas.link,
          leagueURL: leagueId.route.params.leagueURL,
          nav: nav
        });
    }
    if (zapas.liga == leagueId.route.params.leagueId)
    {

      if (zapas.skore_hoste == "-" && zapas.skore_domaci == "-")
      {
        // NEHRAJE SE!
          return (
              <TouchableOpacity style={styles.container} onPress={() => handleMatchBeforePress()}>
                  <View style={{display: 'flex', flexDirection: "row"}}>
                      <Image style={styles.logo_home} source={{uri: zapas.logo_domaci}}></Image>
                      <Text style={styles.home_team}>{zapas.domaci}</Text>
                  </View>
                  {zapas.pstp === "" && (
                    <Text style={styles.time}>{zapas.cas}</Text>
                  )}
                  {zapas.pstp !== "" && (
                    <Text style={styles.time}>{zapas.pstp}</Text>
                  )}
                  <View style={{display: 'flex', flexDirection: "row", height: 35}}>
                      <Image style={styles.logo_away} source={{uri: zapas.logo_hoste}}></Image>
                      <Text style={styles.away_team}>{zapas.hoste}</Text>
                  </View>
              </TouchableOpacity>
          );
      } else 
      {
        // HRAJE SE!
          return (
              <TouchableOpacity style={styles.container} onPress={() => handleMatchPlayingPress()}>
                  <View style={{display: 'flex', flexDirection: "row"}}>
                      <Image style={styles.logo_home} source={{uri: zapas.logo_domaci}}></Image>
                      <Text style={styles.home_team}>{zapas.domaci}</Text>
                  </View>
                  <View>
                      <Text style={styles.skore_domaci}>{zapas.skore_domaci}</Text>
                      <Text style={styles.skore_hoste}>{zapas.skore_hoste}</Text>
                  </View>
                  <View style={{display: 'flex', flexDirection: "row", height: 35}}>
                      <Image style={styles.logo_away} source={{uri: zapas.logo_hoste}}></Image>
                      <Text style={styles.away_team}>{zapas.hoste}</Text>
                  </View>
              </TouchableOpacity>
          );
      }
    }
};

const styles = StyleSheet.create({
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
  }
});

export default FootballMatch;