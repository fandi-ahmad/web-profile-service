const router = require("express").Router()
const userRouter = require('./userRouter')

router.use('/api/v1', userRouter)

module.exports = router