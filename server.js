require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { sequelize, Room, Booking } = require('./models');
const route = require('./routes/routes');
const app = express();
const cookieParser = require('cookie-parser');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to handle JSON data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Check database connection
sequelize.sync().then(() => {
    console.log('Database connected');
  }).catch(err => {
    console.error('Error creating database tables:', err);
  });

app.use('/', route);
app.use('/ping', (req, res) => { res.send({ status: 200, statusText: "success" }) });
app.use((req, res, next) => { res.status(404).render('pageNotFound') });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
