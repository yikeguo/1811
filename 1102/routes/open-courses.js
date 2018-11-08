const express = require('express');
const router = express.Router();

// http://localhost:3000/open-courses/
router.get('/', (req, res) => {
    res.render('open-courses')
})


module.exports = router;