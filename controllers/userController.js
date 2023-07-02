const { Users, sequelize } = require('../models')
const { sign } = require('jsonwebtoken')

const getAllUser = async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5

        const { count, rows } = await Users.findAndCountAll({
            offset: (currentPage - 1) * limit,
            limit: limit
        });

        const result = {
            status: 'ok',
            data: rows,
            page: currentPage,
            limit: limit,
            total_page: Math.ceil(count/limit),
            total_data: count,
        }
        res.json(result)
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'bad request' })
    }
}

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const newUser = await Users.create({
            username: username,
            password: password,
        })
        res.status(201).json({
            status: 'ok',
            data: {
                id: newUser.id,
                username: newUser.username,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })
    } catch (error) {
        res.status(400)
        // console.log(error, '<--- error create user')
    }
} 

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await Users.findAll({
            where: {
                username: username,
                password: password
            }
        })

        const usernameId = user[0].id
        const usernameName = user[0].username

        const accessToken = sign({usernameId, usernameName}, 'accesstokenn8ki495bq', {
            expiresIn: '43200s'
        })

        res.status(200).json({
            status: 'ok',
            message: 'login successfully',
            user: user[0].username,
            accessToken
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: 'username or password is wrong'
        })
        // console.log(error, '<-- error login user')
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findByPk(id)
        if (!user) {
            return res.status(404).json({
                status: 'failed',
                message: 'data is not found'
            })
        }
        user.destroy()
        res.json({
            status: 'ok',
            message: 'delete successfully'
        })
    } catch (error) {
        res.status(400)
        // console.log(error, 'error delete user');
    }
}

const deleteMultiUser = async (req, res) => {
    try {
        const {id_user} = req.body
        const user = await sequelize.query(`DELETE FROM users WHERE id IN(${id_user})`)

        console.log(id_user, '<-- isi dari id_user')
        console.log(user[0].affectedRows, 'jumlah user yang dihapus')

        if (user[0].affectedRows == 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'user is not found'
            })
        } else {
            return res.json({
                status: 'ok',
                message: 'delete successfully'
            })

        }

    } catch (error) {
        res.status(400)
        console.log(error, 'error delete user');
    }
}

const updateUser = async (req, res) => {
    try {
        const { id, username, old_password, new_password } = req.body
        const user = await Users.findByPk(id)

        if (user.password == old_password) {
            user.username = username
            user.password = new_password
            user.save()

            res.json({
                status: 'ok',
                message: 'user updated successfully'
            })
        } else {
            res.json({
                status: 'ok',
                message: 'passwords do not match'
            })
        }

    } catch (error) {
        res.status(400)
        // console.log(error, 'error update user');
    }
}


module.exports = { getAllUser, createUser, loginUser, deleteUser, updateUser, deleteMultiUser }