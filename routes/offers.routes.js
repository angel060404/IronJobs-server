const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { checkRole } = require('../middlewares/checkRole')
const {
    getOffers,
    oneOffer,
    createOffer,
    editOffer,
    deleteOffer,
    subscribeUser,
    unSubscribeUser } = require('../controllers/offers.controllers')

router.get('/getAllOffers', verifyToken, getOffers)

router.get('/getOneOffer/:offer_id', oneOffer)

router.post('/saveOffer', verifyToken, createOffer)

router.delete('/deleteOffer/:offer_id', verifyToken, checkRole('ADMIN', 'OWNER'), deleteOffer)

router.put('/updateOffer/:offer_id', verifyToken, checkRole('ADMIN', 'OWNER'), editOffer)

router.put('/subscribeUser/:offer_id', verifyToken, checkRole('USER'), subscribeUser)

router.put('/unSubscribeUser/:offer_id', verifyToken, unSubscribeUser)

module.exports = router