const API_URL = 'https://api.giphy.com/v1';

export async function getData(endpoint: string, ) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Accept': 'text/html'
    }
  });
  const data = await response.json();

  return data;
}
