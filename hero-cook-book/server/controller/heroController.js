const Hero = require('../model/hero');

exports.getHeroes = (req, res, next) =>{

    const creator = req.params.userId;
 
    Hero.
    find({ creator: creator }).
    populate('powers.power').
    populate('category').
    exec(function (err, heroes) {

        if (err){
            console.log("error",err);
            if(!err.statusCode){
                err.statusCode = 500;
              }
               return next(err);
        };

        res.json({
            message : "heroes fetched successfully",
            heroes: heroes
        })
    });

}

exports.createHero = (req, res, next) =>{

    const heroName = req.body.name;
    const heroCategory = req.body.category;
    const heroPowers = req.body.powers;
    const stars = req.body.star;
    const creator = req.body.creator;

    console.log("heroPowers",heroPowers);
    const newHero = new Hero({
        name : heroName,
        category : heroCategory,
        powers : heroPowers,
        stars : stars,
        creator : creator
    })
    console.log("newHero",newHero);
    newHero.save().then( createdHero =>{
        res.json({
            message : "new hero created",
            hero: createdHero
        })
    }).catch( err =>{
        if(!err.statusCode){
            err.statusCode = 500;
          }
           return next(err);
    })

}