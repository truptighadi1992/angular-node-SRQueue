const Case = require('../model/case');
const System = require('../model/system');

exports.getAllCases =  (req, res, next) =>{

    const userId = req.params.userid;
    const page = +req.query.page;
    const pageSize = +req.query.pagesize;

    var casesForUser = [];
    Case.find().skip( pageSize * (page - 1) ).limit( pageSize)
    .then( cases =>{

        if(!cases){
            const error = new Error("No Cases available");
            error.statusCode = 404;
            throw error;
        }
        
        if(userId == "undefined" || userId == "null")
        {
            casesForUser = [...cases];
        }
        else{
            casesForUser = cases.filter( c =>{
                return c.creator.toString() == userId.toString()
            }) 
        }

        if(!casesForUser.length){
            const error = new Error("No Cases for given user");
            error.statusCode = 404;
            throw error;
        }
        var caseList = [];

        casesForUser.forEach(caseSelected => {
           
            System.findById( caseSelected.system)
            .then( systemInfo =>{

                const clonedObj = { ...caseSelected._doc ,
                    systemInfo : systemInfo }
               
                caseList.push(clonedObj);

                if( casesForUser.length == caseList.length){
                    res.status(200).json({
                        message: "Cases Fetched",
                        cases: caseList
                    })
                }
            })
            .catch( err =>{
                console.log(err);
                err.statusCode = 404;
                throw err;
            })  
        });
    }).catch( err=> {
        if(!err.statusCode){
          err.statusCode = 500;
        }
         return next(err);
    })

}

exports.getCaseDeatils =  (req, res, next) =>{

    const caseId = req.params.caseId;
    let caseInfo;
    Case.findOne({ caseId :caseId})
    .then( caseFetched =>{

        if(!caseFetched){
            const error = new Error("No Case found");
            error.statusCode = 404;
            throw error;
        }
        caseInfo = caseFetched;
        return System.findById( caseFetched.system);
     
    })
    .then( systemInfo =>{
        
        let caseDetails = {
            ...caseInfo._doc,
            systemInfo : systemInfo
        }
        res.status(200).json({
            message: "case details fetched",
            case: caseDetails
        })
    })
    .catch( err=> {
        if(!err.statusCode){
          err.statusCode = 500;
        }
         return next(err);
    })

}

exports.createCase =  (req, res, next) =>{

    const systemId = req.body.system;
    const caseType = req.body.type;
    const caseSubType = req.body.subType;
    const userId = req.body.user;
    const description = req.body.description;
    
    const newcase = new Case({
        type: caseType,
        subtype : caseSubType,
        description:description,
        system : systemId,
        creator : userId
    })
     
    newcase.save().then( createdCase =>{
        
        res.status(201).json({
            message: "Case created successfully",
            case: createdCase
          })
       
    })
    .catch( err=> {
        if(!err.statusCode){
          err.statusCode = 500;
        }
         return next(err);
    })

}

exports.updateCase = (req, res, next) =>{

    const caseId = req.params.caseId;
    const systemId = req.body.system;
    const caseType = req.body.type;
    const caseSubType = req.body.subType;
    const userId = req.body.user;
    const description = req.body.description;

    const updateCase = new Case({
        _id: req.body.id,
        caseId: caseId,
        type: caseType,
        subtype : caseSubType,
        description:description,
        system : systemId,
        creator : userId
    })
    Case.updateOne( { _id: req.body.id }, updateCase)
    .then( result =>{
      
        if (result.nModified > 0) {

            res.status(200).json({ message: "Update successful!" });

          } else {
            const error = new Error("Update failed");
            error.statusCode = 404;
            throw error;
          }
    })
    .catch( err =>{
        
        if(!err.statusCode){
            err.statusCode = 500;
          }
           return next(err);
    })
    
}

exports.deleteCase = (req, res, next) =>{

    const caseId = req.params.caseId;
    
    Case.deleteOne({ caseId : caseId}).then(
        result => {
        
          if (result.n > 0) {
            res.status(200).json({ message: "Deletion successful!" });
          } else {
            const error = new Error("Deletion failed");
            error.statusCode = 404;
            throw error;
          }
      })
      .catch( err =>{
        
        if(!err.statusCode){
            err.statusCode = 500;
          }
           return next(err);
    })
}