const router = require("express").Router()
const { getAllUser, createUser, loginUser, deleteUser, updateUser } = require("../controllers/userController")
const { verifyToken } = require('../middleware/VerifyToken')

router.post('/user/login', loginUser)
router.get('/user', verifyToken, getAllUser)
router.post('/user', verifyToken, createUser)
router.delete('/user/delete/:id', verifyToken, deleteUser)
router.put('/user/update', verifyToken, updateUser)

module.exports = router