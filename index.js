require('dotenv').config();

const app = require('express')();

require('./start/db')();
require('./start/routes')(app);
//require("./start/prod")(app);

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
  // Set static folder

  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



app.listen(port, async () => {
  console.log('App is listening on ' + port);
});
