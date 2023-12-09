import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Menu({ nav }) {
  var logo = require ('../assets/logo.png');
  var search = require ('../assets/lupa.png');

  const handleLogoPress = () => {
    console.log('Logo Clicked');
    nav.navigate('Home')
  };

  const handleSearchPress = () => {
    console.log('Search Clicked');
    nav.navigate('Search')
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogoPress} style={{marginTop: '2%',width: '20%',height: '100%'}}>
        <Image
          source={logo}
          style={{
            marginTop: '2%',
            width: '100%',
            height: '100%',
          }}
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearchPress} style={{marginTop: '6%',marginRight: '5%',width: '9%',height: '41%'}}>
        <Image
          source={search}
          style={{
            marginTop: '6%',
            marginRight: '5%',
            width: '100%',
            height: '100%',
          }}
        ></Image>
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
