// Import MYSQL2 package which was installed using node
const mysql = require('mysql2');

const inputCheck = require('./utils/inputCheck');

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



// APP ROUTE that when client hits (/) the response is ...
// just to checl api route is working! NO USE AT ALL....
app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
});







// QUERY(REQUEST) TO DELETE a single candidate WRAPPED IN AN EXPRESS.JS ROUTE
// - When client hits endpoint /api/candidate/1 in browser URL, route callback arrow function will handle clients db.query request and database response.
app.delete('/api/candidate/:id', (req, res) => {

    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    // - This db.query statement - .query(sqlString, values, callback) -  SQLSTRING and SQLVALUE is assigned to SQLCOMM and PARAMS Variables above
    //   SQLSTRING has a question mark (?) thats acts as placeholder making it a PREPARED STATEMENT
    db.query(sql, params, (err, result) => {
        // IF error is true, will return the app.get res with status of 400
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
            message: 'Candidate not found'
            });
        } else {
            res.json({
            message: 'deleted',
            changes: result.affectedRows,
            id: req.params.id
            });
        }
    });
  });



// QUERY TO READ/GET a single candidate WRAPPED IN AN EXPRESS.JS ROUTE
// - When client hits endpoint /api/candidate/1 in browser URL, route callback arrow function will handle clients db.query request and database response.
app.get('/api/candidate/:id', (req, res) => {

    // - This db.query statement SQL Command and SQL Param is assigned to SQLCOMM and PARAMS Variables
    // The (?) in statement will be replaced by SQL param argument assigned to PARAMS variable,
    // const params value is equal to the route request URL parameter of id which in endpoint /api/candidate/1 is 1
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
        // IF error is true, will return the app.get res with status of 400
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});



// QUERY TO READ WRAPPED IN AN EXPRESS.JS ROUTE (db.query request wrapped in app.get express route)
// - Route is designated to /api/candidates endpoint, when client hits endpoint in browser URL,
//   the route callback arrow function will handle clients db.query request and database response.
app.get('/api/candidates', (req, res) => {

    // - This db.query statement SQL Command is assigned to SQL Variable
    const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id`;
    db.query(sql, (err, rows) => {
        // db.query callback arrow function with two params (err and rows(response)) checks IF err is true,
        // will return the app.get res with status of 500
        if (err) {
            res.status(500).json({error: err.message});
            return
        }
        // If there is no err, the route response(res) will display an OBJECT with a message and data PROPERTIES,
        // the data property will have a value of rows whish is the db.query sql response of SELECT * FROM candidates
        res.json({
            message: 'sucess',
            data: rows
        }) 
    });
})

// QUERY TO CREATE A CANDIDATE 
// - When user hits endpoint (/api/candidate), call back function will use the object ( req.body ) to populate candidates data,
//   it is written { body} because its a deconstruction of req,body Remember .. this is a POST REQUEST so the request.body means
//   the body of the rquest which would be an array or any data being posted.
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    // If no error is found by function (inputCheck), then this happens...
    const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id 
                WHERE candidates.id = ?`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: body
    });
    });
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