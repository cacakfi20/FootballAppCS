import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function LeagueRow({ index, item }) {
  return (
    <View key={index} style={{width:'100%', borderBottomWidth:'1px', borderBottomColor:'grey', display:'flex', justifyContent:'space-between'}}>
        <View style={{display:'flex', flexDirection:'row'}}>
            <Image
                style={{width: '10%', height: '80%', paddingVertical:'5%', marginLeft:'5%'}}
                source={{uri: item.flag}}
            ></Image>
            <Text style={{color:'white', marginTop:'3%', marginLeft:'3%'}}>{item.name}</Text>
        </View>
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
