const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

// Define Product schema
const productSchema = new mongoose.Schema({
  name: String,
  rate: Number,
  quantity: String,
  image: String,
  hoverImage: String
});

const farmSchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  farminside: String,
  products: [productSchema]
});

const Farm = mongoose.model('Farm', farmSchema);

// Routes
app.get('/farms', async (req, res) => {
  try {
    const farms = await Farm.find();
    res.json(farms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching farms' });
  }
});

app.post('/farms', async (req, res) => {
  const { name, description, logo, farminside, products } = req.body;

  try {
    const newFarm = new Farm({ name, description, logo, farminside, products });
    await newFarm.save();
    res.status(201).json(newFarm);
  } catch (error) {
    res.status(500).json({ error: 'Error creating farm' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
