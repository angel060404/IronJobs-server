const express = require('express')
const Company = require('../models/Company.model')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()
const User = require('./../models/User.model')
const { checkRole } = require('../middlewares/checkRole')
const Offer = require('../models/Offer.model')

router.get('/getAllCompanies', (req, res, next) => {

    Company
        .find()
        .select({ name: 1, image: 1, field: 1, description: 1, owner: 1 })
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
        .create({ email, owner, name, website, field, phoneNumber, image, description })
        .then(data => User.findByIdAndUpdate(owner, { $push: { companies: data._id }, role: 'OWNER' }))
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})

router.delete('/deleteCompany/:company_id', verifyToken, checkRole('ADMIN', 'OWNER'), (req, res, next) => {

    const { company_id } = req.params
    const { _id: owner } = req.payload

    Company
        .findByIdAndDelete(company_id)
        .then(() => User.findOneAndUpdate({ companies: company_id }, { $pull: { companies: company_id } }))
        .then(() => Offer.findOneAndDelete({ company: company_id }))
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
})

router.put('/updateCompany/:company_id', verifyToken, checkRole('ADMIN', 'OWNER'), (req, res, next) => {

    const { company_id } = req.params
    const { email, name, website, field, phoneNumber, image, description, } = req.body

    Company
        .findByIdAndUpdate(company_id, { email, name, website, field, phoneNumber, image, description, })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
})


module.exports = router