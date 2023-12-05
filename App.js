import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { scraper } from './scripts/ScrapeComponent.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

export default function App() {
  async function scraper(url){
    console.log('Scraping...');
    try {
      console.log('try')
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);  
      const matches = $('.L_c6 .L_fH')

      const scrapedData = [];

      matches.each((index, element) => {
          // Extract data from each row and create an object
          const rowData = {
              den: $(element).find('td.-_ft:contains("dnes")').text(),
              domaci: $(element).find('.al_ft').text(),
              hoste: $(element).find('.am_ft').text(),
              // Add more properties as needed based on your HTML structure
          };

          // Push the object to the array
          if (rowData.den != ''){
            scrapedData.push(rowData);
          }
      });

      // Convert the array of objects to a JSON string
      const jsonData = JSON.stringify(scrapedData, null, 2);
      
      console.log(jsonData)
      console.log('done')
    } catch (error) {
      console.log('error')
      return({ error: 'Failed to update positions.' });
    }
  
  }
  scraper(url='https://www.sport.cz/sekce/fotbal-premier-league-kalendar-709')

  return (
    <View style={styles.container}>
      <Text>Football App CS</Text>
      <Text>2023/24</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100E21',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
