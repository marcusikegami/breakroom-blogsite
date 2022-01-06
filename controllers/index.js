const router = require('express').Router();
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;