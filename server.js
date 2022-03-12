const express = require('express');
// Imported mysql.createConnection from connection.js
const db = require('./db/connection');
// Import API ROUTES from 
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// By adding the /api prefix here, we can remove it from the individual route expressions
app.use('/api', apiRoutes);


// APP ROUTE that when client hits (/) the response is ...
// just to checl api route is working! NO USE AT ALL....
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
});

// Default response for any other request (Not Found)
// Because this is a catchall route, its placement is very important.
// This route will override all others—so make sure that this is the last one.
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
});









///////////////// OLD CODE /////////////////////// ///////////////// OLD CODE /////////////////////// ///////////////// OLD CODE ///////////////////////
///////////////// OLD CODE /////////////////////// ///////////////// OLD CODE /////////////////////// ///////////////// OLD CODE ///////////////////////
///////////////// OLD CODE /////////////////////// ///////////////// OLD CODE /////////////////////// ///////////////// OLD CODE ///////////////////////



//////////////////////////////////

// QUERY(REQUEST) TO READ - GET a single candidate  
// - Will return a single candidate from the candidates table based on their id

        // db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
        //      if (err) {
        //      console.log(err);
        //      }
        //      console.log(row);
        // });

//////////////////////////////////

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

//////////////////////////////////


// Query database to test connection - returns all the data in the CANDIDATES TABLE
            // db.query(`SELECT * FROM candidates`, (err, rows) => {
            //     console.log(rows);
            // });

//////////////////////////////////

// QUERY(REQUEST) TO CREATE - GET AND DELETE a single candidateCreate a candidate
// -  This db.query statement SQL Command and SQL Paramater are assigned to two variables: (SQL & PARAMS) 

        // const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
        //               VALUES (?,?,?,?)`;
        // const params = [1, 'Ronald', 'Firbank', 1];

        // db.query(sql, params, (err, result) => {
        //   if (err) {
        //     console.log(err);
        //   }
        //   console.log(result);
        // });

//////////////////////////////////