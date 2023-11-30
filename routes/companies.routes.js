const express = require('express')
const Company = require('../models/Company.model')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json('HOLAAAA')
})


router.get('/getAllCompanies', (req, res, next) => {

    Company
        .find()
        .select({ name: 1, image: 1, field: 1, description: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/getOneCompany/:company_id', (req, res, next) => {

    const { company_id } = req.params

    Company
        .findById(company_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/createCompany', verifyToken, (req, res, next) => {

    const { email, name, website, field, phoneNumber, image, description, } = req.body
    const { _id: owner } = req.payload

    Company
        .create({ owner, email, name, website, field, phoneNumber, image, description })
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router