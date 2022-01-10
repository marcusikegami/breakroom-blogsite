const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({})
        .then(posts => {res.json(posts)});
});

router.get('/edit/:id', (req, res) => {
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
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/:id', (req, res) => {
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
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



router.post('/', withAuth, (req, res) => {

    Post.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id,
        // include: {
        //     model: User,
        //     attributes: ['id', 'username' ],
        // }

    })
        .then(postData => {
            res.json(postData);
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {

    Post.update(
        {
            title: req.body.title,
            description: req.body.description,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postData => {
            if(!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if(!postData) {
                res.status(404).json({ message: 'No post found with this id'});
                return;
            }
            res.json(postData);
        }) 
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;