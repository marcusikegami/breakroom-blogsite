const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll()
    .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {

       
    bcrypt.hash(req.body.password, 10, function(err, hash) {
            User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        .then(userData => res.json(userData))
        .catch(err => {            console.log(err);
            res.status(500).json(err);
        });
        
    });

    
});

router.get('/login', (req, res) => {

    if (req.session.loggedIn) {
        res.redirect('/');
        return;
      }

    res.render('login');
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userData => {
        if(!userData) {
            console.log('No user with that email address');
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        
        const validPassword = userData.checkPassword(req.body.password);
        if(!validPassword) {
            console.log('Invalid password.');
            res.status(400).json({message: 'Incorrect Password.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.email = userData.email;
            req.session.loggedIn = true;

            res.render('homepage', {loggedIn: true});
            
        })
    })
    
});

router.post('/logout', (req, res) => {

    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
            
        });
    }
    else {
        res.status(404).end()
    }

});
    
// PUT /api/users/1
router.put('/:id', (req, res) => {});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            res.json({ message: 'user deleted' })
            res.status(400).end()
        })
            
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;