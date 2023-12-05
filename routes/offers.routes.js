const express = require('express')
const router = express.Router()
const Offer = require('../models/Offer.model')
const { verifyToken } = require('../middlewares/verifyToken')
const Company = require('../models/Company.model')
const { checkRole } = require('../middlewares/checkRole')

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
        .populate('applicants')
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
        .then(imageUrl => {
            return (Offer.create({
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
        })
        .then(offerCreated => Company.findByIdAndUpdate(company, { $push: { offers: offerCreated._id } }))
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})

router.delete('/deleteOffer/:offer_id', verifyToken, checkRole('ADMIN', 'OWNER'), (req, res, next) => {


    const { offer_id } = req.params

    Offer
        .findById(offer_id)
        .then(response => response.company)
        .then(company_id => Company.findByIdAndUpdate(company_id, { $pull: { offers: offer_id } }))
        .then(() => Offer.findByIdAndDelete(offer_id))
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
})

router.put('/updateOffer/:offer_id', verifyToken, checkRole('ADMIN', 'OWNER'), (req, res, next) => {

    const { title, occupation, description, salary, latitude, longitude, type, duration } = req.body
    const { offer_id } = req.params

    Offer
        .findByIdAndUpdate(offer_id, { title, occupation, description, salary, latitude, longitude, type, duration })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))


})

router.put('/subscribeUser/:offer_id', verifyToken, checkRole('USER'), (req, res, next) => {

    const { user_id } = req.body
    const { offer_id } = req.params

    Offer
        .findByIdAndUpdate(offer_id, { $addToSet: { applicants: user_id } })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
})

router.put('/unSubscribeUser/:offer_id', verifyToken, (req, res, next) => {

    const { user_id } = req.body
    const { offer_id } = req.params
    console.log(req.body)

    Offer
        .findByIdAndUpdate(offer_id, { $pull: { applicants: user_id } })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
})

module.exports = router