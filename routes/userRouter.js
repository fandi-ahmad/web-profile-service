const router = require("express").Router()
const { getAllUser, createUser, loginUser, deleteUser, updateUser } = require("../controllers/userController")
const { createUserDetail, getAllUserDetail, getUserDetailById, updateUserDetail, deleteUserDetail } = require('../controllers/userDetailController')
const { verifyToken } = require('../middleware/VerifyToken')

router.post('/user/login', loginUser)
router.get('/user', verifyToken, getAllUser)
router.post('/user', verifyToken, createUser)
router.delete('/user/delete/:id', verifyToken, deleteUser)
router.put('/user/update', verifyToken, updateUser)

router.get('/user/detail', getAllUserDetail)
router.get('/user/detail/:id_user', getUserDetailById)
router.post('/user/detail', createUserDetail)
router.put('/user/detail/update', updateUserDetail)
router.delete('/user/detail/delete/:id_user', deleteUserDetail)

module.exports = router