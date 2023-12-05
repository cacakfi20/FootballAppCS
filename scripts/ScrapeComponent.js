const axios = require('axios');
const cheerio = require('cheerio');

function scraper(url){
    axios.get(url)
    .then(response => {
        if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        const eventMatchList = [];

        $('.event__match').each((index, element) => {
            console.log(element)
            eventMatchList.push($(element).html());
          });
        } else {
          console.error('Failed to fetch the webpage');
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
    return (
        eventMatchList
    );
}