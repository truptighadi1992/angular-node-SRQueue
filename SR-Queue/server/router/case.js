const express = require('express');
const caseController = require('../controller/case');

const router = express.Router();
const isAuth = require('../util/is-auth');

router.post("/create", isAuth, caseController.createCase);
router.post("/update/:caseId", isAuth, caseController.updateCase);
router.delete("/delete/:caseId", isAuth, caseController.deleteCase);
router.get("/fetchOne/:caseId", caseController.getCaseDeatils);
router.get("/fetchAll/:userid", caseController.getAllCases);

module.exports = router;