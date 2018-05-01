
const handler = require('./handler');
const express = require('express');
const app = express();
const port = 3000;

/**Directory client is used to serve the static content*/
app.use(express.static('client'));

/** Returns the initial configuration settings to run the game app*/
app.get('/getInitialConfig', handler.getInitialConfig);

/**Triggered on button click to get winning result */
app.get('/getResult', handler.getResult);

app.listen(port, () => console.log(`App listening on port ${port}!`));
