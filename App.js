import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import cheerio from 'cheerio';
import axios from 'axios';

const url = 'https://www.sofascore.com/'

const FetchData = async (url) => {
  const response = await axios.get(url);
  return response.data;
}

const extractData = (html) => {
  const $ = cheerio.load(html);
  const title = $("dio[class=")
  return {$};
}

const main = async () => {
  const html = await FetchData(url);
  console.log(html)
  

}

function App() {
  main()
  return (
    
    <View style={styles.container}>
      <Text>uyfy</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100E21',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
