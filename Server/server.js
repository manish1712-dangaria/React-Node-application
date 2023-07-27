const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/api/fetchStockData', async (req, res) => {
    const { symbol, date } = req.body;
  
    try {
      
      const response = await axios.get(`https://api.polygon.io/v1/open-close/${symbol}/${date}?apiKey=JFNI8YZwOqmo3pBcqhADJ7strjOrFs3U`);
  
     
      const { symbol: stockSymbol, open, close, high, low, volume } = response.data;
  
      
      const tradeData = {
        symbol: stockSymbol,
        open,
        close,
        high,
        low,
        volume,
        date,
      };
  
      res.json(tradeData);
    } catch (error) {
      console.error('Error fetching stock data:', error.message);
      res.status(500).json({ error: 'Error fetching stock data' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});