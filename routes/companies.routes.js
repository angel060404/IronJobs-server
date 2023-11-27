const express = require('express')
const Company = require('../models/Company.model')
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

router.post('/cerateCompany', (req, res, next) => {

    const { email, name, website, fiels, phoneNumber, image, description, } = req.body
    const { owner } = req.session.currentUser
    Company
        .create({ owner, email, name, website, fiels, phoneNumber, image, description })
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router