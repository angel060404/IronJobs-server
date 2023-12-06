const express = require('express')
const router = express.Router()

const { verifyToken } = require('../middlewares/verifyToken')
const {
    getUser,
    userVerify,
    logIn,
    signUp,
} = require('../controllers/auth.controllers')


router.post('/sign-up', signUp)

router.post('/log-in', logIn)

router.get('/verify', verifyToken, userVerify)

router.get('/:user_id', getUser)



module.exports = router