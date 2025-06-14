const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/FTA?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
  return mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectToMongo;
