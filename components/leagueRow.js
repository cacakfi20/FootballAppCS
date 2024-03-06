import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function LeagueRow({ index, item, nav, selectedUrl }) {
  const handleLeaguePress = () => {
    nav.navigate('Matches', { leagueId:item.ligaid, leagueName:item.name, leagueFlag:item.flag, url:selectedUrl, leagueURL: item.leagueURL });
  }
  let borTopW = 0;
  if(index == 0) {
    borTopW = 1;
  } else {
    borTopW = 0;
  }
  return (
      <View key={index} style={{width:'100%', borderBottomWidth:'1', borderTopWidth:borTopW, borderBottomColor:'#494949', borderTopColor:'#494949', display:'flex', justifyContent:'space-between'}}>
        <TouchableOpacity onPress={handleLeaguePress}>
          <View key={index} style={{display:'flex', flexDirection:'row', height: 64}}>
              <Image
                  style={{width: '10%', height: '30%', marginLeft:'5%', marginTop: '5%'}}
                  source={{uri: item.flag}}
              ></Image>
              <Text style={{color:'white', marginTop:'5%', marginLeft:'5%', fontSize: 20}}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Add space between the images
    marginTop: '8%',
    width: '100%',
    height: '10%',
    backgroundColor: '#100E21',
    borderBottomWidth: 1,
  },
});
