const router = require("express").Router()
const userRouter = require('./userRouter')
const serviceRouter = require('./serviceRouter')
const setupRouter = require('./setupRouter')

router.use('/api/v1', userRouter)
router.use('/api/v1', serviceRouter)
router.use('/api/v1', setupRouter)

module.exports = router