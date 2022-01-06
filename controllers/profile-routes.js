const router = require('express').Router();

router.get('/', (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    if(req.session.loggedIn) {
        console.log(req.session);
        res.render('profile', {loggedIn: true});
    }
    
})


module.exports = router;