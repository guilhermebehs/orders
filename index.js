const express = require('express');
const routes = require('./src/routes');
const bodyParser = require('body-parser');


const app = express()

app.use(bodyParser.json())
app.use(routes)

app.listen(3000, ()=> console.log('Ouvindo na porta 3000'))