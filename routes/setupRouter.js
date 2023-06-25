const router = require("express").Router()
const { getAllSetup, createSetup, getSetupById, updateSetup, deleteSetup } = require("../controllers/setupController")

router.get('/setup', getAllSetup)
router.get('/setup/:id', getSetupById)
router.post('/setup', createSetup)
router.put('/setup/update', updateSetup)
router.delete('/setup/:id', deleteSetup)

module.exports = router