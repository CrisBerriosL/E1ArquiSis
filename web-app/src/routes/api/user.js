const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

const { checkNotAuthenticated } = require('../../middlewares/passport-config');

const { User } = require('../../models');

router.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('login')
    }
);

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
    }
);


router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}));

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 5);
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            contact: req.body.contact,
        });
        res.redirect('/user/login');
    } catch (error) {
        res.redirect('/user/register');
    }}
);

router.delete('/logout', async (req, res) => {
    await req.logout(function(err) {
        if (err) { return next(err); };
        res.redirect('/');
      });
});


module.exports = router;