const { Users } = require('../models')
const { sign } = require('jsonwebtoken')

const getAllUser = async (req, res) => {
    try {
        const data = await Users.findAll()
        const result = {
            status: 'ok',
            data: data
        }
        res.json(result)
    } catch (error) {
        console.log(error, '<-- error get user')
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
        console.log(error, '<--- error create user')
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
        console.log(error, '<-- error login user')
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
        console.log(error, 'error update user');
    }
}

// example
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params
        const { name, theClass } = req.body
        const student = await Student.findByPk(id)

        if (!student) {
            return res.status(404).json({
                status: 'failed',
                message: 'data is not found'
            })
        }

        student.name = name
        student.class = theClass
        student.save()      // save data to db

        res.json({
            status: 'ok',
            data: {
                id: student.id,
                name: student.name,
                class: student.class,
                createdAt: student.createdAt,
                updatedAt: student.updatedAt
            }
        })
        
    } catch (error) {
        console.log(error, '<-- error update student')
    }
}

module.exports = { getAllUser, createUser, loginUser, deleteUser, updateUser }