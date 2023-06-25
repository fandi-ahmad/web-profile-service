const router = require("express").Router()
const { getAllService, createService, deleteService, updateService, getServiceById } = require("../controllers/serviceController")

router.get('/service', getAllService)
router.get('/service/:id', getServiceById)
router.post('/service', createService)
router.delete('/service/delete/:id', deleteService)
router.put('/service/update', updateService)

module.exports = router