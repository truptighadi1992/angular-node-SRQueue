const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const System = require('../model/system');

router.get("/:id" , isAuth, (req, res, next) => {
    const systemId = req.params.id;

    System.findOne({ systemId : systemId})
    .then( systemFetched => {

        if(!systemFetched){
            const error = new Error("System Not Found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message : "System Details Fetched Successfully",
            system : systemFetched
        })
    })
    .catch( err=> {

      if(!err.statusCode){
        err.statusCode = 500;
      }
       return next(err);
    })
});

/* router.post("/", isAuth, (req, res, next) => {

}); */

module.exports = router;