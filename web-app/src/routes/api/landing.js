const express = require('express');

const router = express.Router();

const { Event } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.render('landing', { events: events, user: req.user });
    } catch (e) {
        res.status(400).json({ error: e });
    }}
);

module.exports = router;