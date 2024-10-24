const express = require('express');
const app = express();
const dotenv=require('dotenv')
const path=require('path')
const cors=require('cors')
const connectDatabase=require('./config/connectdb.js')
dotenv.config({path:path.join(__dirname,'config','config.env')});
    
const products = require('./routes/products.js');

const order=require('./routes/order.js')

connectDatabase();
app.use(express.json())
app.use(cors())
app.use('/api/v1',products)
app.use('/api/v1',order)

app.use(express.static(path.join(__dirname, '../frontend/build')));  // <-- Added this line to serve the React app's static files

// Handle React routing, return all requests to the React app
app.get('*', (req, res) => {                                        // <-- Added this block to ensure React Router works in production
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});





app.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});