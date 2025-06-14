const connectToMongo = require('./db');
const express = require('express'); 
const cors = require('cors');
const nutritionRoute = require('./routes/nutrition');

const app = express();
const port = 5000;

app.use(cors());

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to FTA - 2025');
});

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/fitness', require('./routes/dashboard'));
app.use('/api/nutrition', nutritionRoute);


// Connect to MongoDB first, then start server
connectToMongo()
  .then(() => {
    console.log('Connected to DB!');
    app.listen(port, () => {
      console.log(`FTA backend listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
  });
