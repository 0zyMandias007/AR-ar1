const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const { lat, lon } = event.queryStringParameters;

    const params = {
        radius: 300,
        clientId: process.env.FOURSQUARE_CLIENT_ID,
        clientSecret: process.env.FOURSQUARE_CLIENT_SECRET,
        version: '20300101',
    };

    const endpoint = `https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${lat},${lon}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=30
        &v=${params.version}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data.response.venues),
        };
    } catch (error) {
        console.error('Error with places API', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch places' }),
        };
    }
};
