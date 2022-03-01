const router = require('express').Router();
const { Post } = require('../models');

router.get('/', (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
    .then(postData => {
        const posts = postData.reverse().map(posts => posts.get({ plain: true }));
        res.render('profile', {posts, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    
    
})


module.exports = router;