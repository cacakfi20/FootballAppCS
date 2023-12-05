const requst = require('request-promise');
const cheerio = request('cheerio');

const URL = 'https://www.livesport.cz/';

function Scrape()
{
    (async() => {
        const response = await request(URL);

        return response;
    })
}

export default Scrape;