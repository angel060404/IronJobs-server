const express = require('express')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()
const { checkRole } = require('../middlewares/checkRole')
const {
    getCompanies,
    oneCompany,
    createCompany,
    deleteCompany,
    editCompany } = require('../controllers/companies.controllers')

router.get('/getAllCompanies', getCompanies)

router.get('/getOneCompany/:company_id', verifyToken, oneCompany)

router.post('/createCompany', verifyToken, createCompany)

router.delete('/deleteCompany/:company_id', verifyToken, checkRole('ADMIN', 'OWNER'), deleteCompany)

router.put('/updateCompany/:company_id', verifyToken, checkRole('ADMIN', 'OWNER'), editCompany)

module.exports = router