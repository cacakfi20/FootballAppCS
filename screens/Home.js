import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { useEffect, useState } from 'react';
import Menu from '../components/menu.js';


export default function Home({navigation}) {
  const [todayData, setTodayData] = useState(null);

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
              den: $(element).find('td.-_ft:contains("dnes")').text().trim(),
              cas: $(element).find('td.-_ft:contains(":")').text().trim(),
              domaci: $(element).find('.al_ft').text().trim(),
              hoste: $(element).find('.am_ft').text().trim(),
              // Add more properties as needed based on your HTML structure
          };

          // Push the object to the array
          if (rowData.den != ''){
            scrapedData.push(rowData);
          }
      });

      // Convert the array of objects to a JSON string
      const finalData = scrapedData.slice(0, scrapedData.length/2);
      const jsonData = JSON.stringify(finalData, null, 2);
      
      console.log('done')
      return(jsonData);
    } catch (error) {
      console.log('error')
      return({ error: 'Failed to update positions.' });
    }
  
  }

  useEffect(() => {
    async function fetchData() {
      const result = await scraper('https://www.sport.cz/sekce/fotbal-premier-league-kalendar-709');
      setTodayData(JSON.parse(result));
      console.log(result);
    }
    fetchData();
  }, []); 

  return (
    <View style={styles.container}>
      <Menu nav={navigation}/>
      {/*todayData && todayData.map((item, index) => (
        <View key={index} style={{width:'100%', borderBottomWidth:'1px', borderBottomColor:'grey', display:'flex', justifyContent:'space-between'}}>
          <View>
            <Text style={{color:'white'}}>{item.domaci}</Text>
            <Text style={{color:'white'}}>{item.hoste}</Text>
          </View>
        </View>  
      ))*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#100E21',
    height: '100%',
  },
});
