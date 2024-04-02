import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function League({ leagueID ,nav }) {

  const handleLeagueNamePress = () => {
    console.log('League pressed');
    console.log(leagueID.route.params.leagueName, leagueID.route.params.leagueFlag, leagueID.route.params.leagueURL)
    nav.navigate('Table', {leagueName: leagueID.route.params.leagueName, leagueFlag: leagueID.route.params.leagueFlag, leagueURL: leagueID.route.params.leagueURL});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLeagueNamePress}>
        <View style={{display:'flex', flexDirection:'row', height: 64}}>
              <Image
                  style={{width: '10%', height: '30%', marginLeft:'5%', marginTop: '6.5%'}}
                  source={{uri: leagueID.route.params.leagueFlag}}
              ></Image>
              <Text style={{color:'white', marginTop:'6%', marginLeft:'5%', fontSize: 20}}>{leagueID.route.params.leagueName}</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '8%',
    backgroundColor: '#2B2940',
    borderBottomWidth: 1,
  },
  leagueName: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 20
  }
});
