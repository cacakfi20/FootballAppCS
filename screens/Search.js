import { StyleSheet, Text, View } from 'react-native';
import Menu from '../components/menu.js';


export default function Search({navigation}) {
    return (
    <View style={styles.container}>
      <Menu nav={navigation}/>
      <Text>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#100E21',
      height: '100%',
    },
  });