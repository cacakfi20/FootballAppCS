import axios from 'axios';
import * as cheerio from 'cheerio';

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
      const jsonData = JSON.stringify(scrapedData, null, 2);
      
      console.log(jsonData)
      console.log('done')
    } catch (error) {
      console.log('error')
      return({ error: 'Failed to update positions.' });
    }
  }
  
  export {scraper}