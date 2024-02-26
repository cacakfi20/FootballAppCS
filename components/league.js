import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function League({ leagueID ,nav }) {

  const handleLeagueNamePress = () => {
    console.log('League pressed');
    console.log(leagueID.route.params.leagueFlag);
    //nav.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLeagueNamePress}>
        <View style={{display:'flex', flexDirection:'row', height: 64}}>
              <Image
                  style={{width: '10%', height: '30%', marginLeft:'5%', marginTop: '5%'}}
                  source={{uri: leagueID.route.params.leagueFlag}}
              ></Image>
              <Text style={{color:'white', marginTop:'5%', marginLeft:'5%', fontSize: 20}}>{leagueID.route.params.leagueName}</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '8%',
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
