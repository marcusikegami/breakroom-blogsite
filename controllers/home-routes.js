const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        include: {
            model: User,
            attributes: ['id', 'username' ]
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }

        const posts = postData.map(posts => posts.get({ plain: true }));
        res.render('homepage', {posts, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Comment,
            order: [['created_at', 'ASC']],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
              }

            const post = postData.get({ plain: true });
            console.log(post);
            res.render('single-post', {post, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    res.render('login');
})

module.exports = router;