const express = require('express')
const router = express.Router()
const Offer = require('../models/Offer.model')

router.get('/getAllOffers', (req, res, next) => {

    Offer
        .find()
        .sort({ title: 1 })
        .select({ title: 1, owner: 1, salary: 1, location: 1, type: 1, occupation: 1 })
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
router.post('/saveOffer', (req, res, next) => {

    const { title, occupation, description, salary, latitude, longitude, type, duration, imageUrl } = req.body
    const owner = req.session.currentUser
    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    Offer
        .create({ title, occupation, description, salary, location, type, duration, owner, imageUrl })
        .then(response => res.json(response))
        .catch(err => next(err))
})
module.exports = router