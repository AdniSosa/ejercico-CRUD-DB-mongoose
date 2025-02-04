// Añadiremos nuestro servidor, conexión a la base de datos y uniremos el resto de la aplicación

const express = require('express'),
dbConnection = require('./config/config'),
routes = require('./routes/tasks')
app = express(),
PORT = 3000;

app.use(express.json());

app.use('/', routes);

dbConnection();


app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})