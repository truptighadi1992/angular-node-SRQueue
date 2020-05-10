const express = require('express');
const router = express.Router();

const HeroController = require('../controller/heroController');

router.post('/create', HeroController.createHero);
router.get('/:userId', HeroController.getHeroes);

module.exports = router;