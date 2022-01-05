const router = require('express').Router();
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    res.json('success');
})

module.exports = router;