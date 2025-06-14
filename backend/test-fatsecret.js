const axios = require('axios');

async function testFatSecretSearch(query) {
  const client_id = '8d6d47b9cef1486f98f7ac1422c84b4d';
  const client_secret = '2aa79873552548eb8d71efde67841adf';

  const getToken = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const response = await axios.post('https://oauth.fatsecret.com/connect/token', params, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  };

  try {
    const token = await getToken();
    const searchParams = new URLSearchParams();
    searchParams.append('method', 'foods.search.v2');
    searchParams.append('search_expression', query);
    searchParams.append('format', 'json');

    const response = await axios.post('https://platform.fatsecret.com/rest/server.api', searchParams.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Test with "banana"
testFatSecretSearch('banana');
