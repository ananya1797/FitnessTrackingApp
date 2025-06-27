const axios = require('axios');
require('dotenv').config();

const listModels = async () => {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    );
    console.log("Available models:", response.data.models);
  } catch (error) {
    console.error("Error listing models:", error.response?.data || error.message);
  }
};

listModels();
