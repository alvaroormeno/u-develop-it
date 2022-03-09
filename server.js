const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




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
//////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});