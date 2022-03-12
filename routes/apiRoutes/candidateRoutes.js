const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');



// QUERY TO READ/GET a single candidate WRAPPED IN AN EXPRESS.JS ROUTE
// - When client hits endpoint /api/candidate/1 in browser URL, route callback arrow function will handle clients db.query request and database response.
router.get('/candidate/:id', (req, res) => {

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
router.get('/candidates', (req, res) => {

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
router.post('/candidate', ({ body }, res) => {
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

// QUERY(REQUEST) TO DELETE a single candidate WRAPPED IN AN EXPRESS.JS ROUTE
// - When client hits endpoint /api/candidate/1 in browser URL, route callback arrow function will handle clients db.query request and database response.
router.delete('/candidate/:id', (req, res) => {

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

// PUT API Route to Update a candidate's party
router.put('/candidate/:id', (req, res) => {

    const errors = inputCheck(req.body, 'party_id');
    if (errors) {
    res.status(400).json({ error: errors });
    return;
    }
    // If no error is found by function (inputCheck), then this happens...
    const sql = `UPDATE candidates SET party_id = ? 
                 WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
});


module.exports = router;