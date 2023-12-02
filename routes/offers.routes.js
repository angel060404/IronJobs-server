const express = require('express')
const router = express.Router()
const Offer = require('../models/Offer.model')
const { verifyToken } = require('../middlewares/verifyToken')
const Company = require('../models/Company.model')

router.get('/getAllOffers', (req, res, next) => {

    Offer
        .find()
        .sort({ title: 1 })
        .select({ title: 1, owner: 1, salary: 1, location: 1, type: 1, occupation: 1, imageUrl: 1, description: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/getOneOffer/:offer_id', (req, res, next) => {

    const { offer_id } = req.params

    Offer
        .findById(offer_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/saveOffer', verifyToken, (req, res, next) => {

    const { title, occupation, description, salary, latitude, longitude, type, duration, company } = req.body
    const { _id: owner } = req.payload
    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    Company
        .findById(company)
        .then(companyData => companyData.image)
        .then(imageUrl => Offer.create({
            occupation,
            title,
            description,
            owner,
            company,
            salary,
            location,
            type,
            duration,
            imageUrl
        }))
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})


module.exports = router