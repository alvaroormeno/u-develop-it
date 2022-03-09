// Import MYSQL2 package which was installed using node
const mysql = require('mysql2');

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Code that connects application to the MYSQL DATA BASE
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'mysqlroot1',
      database: 'election'
    },
    console.log('Connected to the election database.')
);




app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
});









// Query database to test connection - returns all the data in the CANDIDATES TABLE
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});


// Default response for any other request (Not Found)
// Because this is a catchall route, its placement is very important.
// This route will override all others—so make sure that this is the last one.
app.use((req, res) => {
    res.status(404).end();
});
//////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});