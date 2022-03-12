// THIS FILE WILL ACT AS A CENTRAL HUB TO PULL ALL API ROUTES TOGETHER

const express = require('express');
const router = express.Router();

router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));
router.use(require('./voterRoutes'));
router.use(require('./voteRoutes'));


module.exports = router;