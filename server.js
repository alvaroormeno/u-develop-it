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



// QUERY(REQUEST) TO CREATE - GET AND DELETE a single candidateCreate a candidate
// -  This db.query statement SQL Command and SQL Paramater are assigned to two variables: (SQL & PARAMS) 
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});



// QUERY(REQUEST) TO DELETE - GET AND DELETE a single candidate
// -  DELETE statement has a question mark (?) thats acts as placeholder making it a PREPARED STATEMENT
//    A prepared statement can execute the same SQL statements repeatedly using different values in place of the placeholder.
//    An additional param argument following the prepared statement provides values to use in place of (?)
//    the param argument can be an array that holds multiple values for the multiple placeholders.
        // db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
        //     if (err) {
        //     console.log(err);
        //     }
        //     console.log(result);
        // });



// QUERY(REQUEST) TO READ - GET a single candidate  
// - Will return a single candidate from the candidates table based on their id
        // db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
        //     if (err) {
        //     console.log(err);
        //     }
        //     console.log(row);
        // });



// Query database to test connection - returns all the data in the CANDIDATES TABLE
            // db.query(`SELECT * FROM candidates`, (err, rows) => {
            //     console.log(rows);
            // });


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