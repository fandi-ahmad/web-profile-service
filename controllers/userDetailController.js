const { Users, UserDetail, Service, sequelize } = require('../models')

const createUserDetail = async (req, res) => {
    console.log('create user detail dijalankan')
    try {
        const { id_user , fullname, email } = req.body
        await sequelize.query(`
            INSERT INTO user_details (id_user, fullname, email, createdAt, updatedAt) 
            VALUES (${id_user}, '${fullname}', '${email}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `)
        
        res.status(201).json({
            status: 'ok',
            message: 'user detail created successfully',
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: 'user not found or already used'
        })
    }
}

const getAllUserDetail = async (req, res) => {
    try {
        const data = await sequelize.query(`SELECT * FROM user_details`)

        const result = {
            status: 'ok',
            data: data[0]
        }
       
        res.json(result)
    } catch (error) {
        res.status(400)
    }
}

const getUserDetailById = async (req, res) => {
    try {
        const {id_user} = req.params
        const data = await sequelize.query(`SELECT * FROM user_details WHERE id_user=${id_user}`)
        const result = {
            status: 'ok',
            data: data[0]
        }
        res.json(result)
    } catch (error) {
        res.status(400)
    }
}

const updateUserDetail = async (req, res) => {
    try {
        const { id_user , fullname, email } = req.body
        const userDetail = await sequelize.query(`SELECT * FROM user_details WHERE id_user=${id_user}`)
        if (userDetail[0][0]) {
            await sequelize.query(`
                UPDATE user_details
                set fullname = '${fullname}', email = '${email}', updatedAt = CURRENT_TIMESTAMP
                WHERE id_user = ${id_user};
            `)
            res.status(200).json({
                status: 'ok',
                message: 'user detail updated successfully',
            })
        } else {
            res.status(404).json({
                status: 'error',
                message: 'user not found'
            })
        }
    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }
}

const deleteUserDetail = async (req, res) => {
    try {
        const {id_user} = req.params
        await sequelize.query(`DELETE FROM user_details WHERE id_user=${id_user}`)

        res.status(200).json({
            status: 'ok',
            message: 'user detail delete successfully',
        })
    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: 'user detail not found'
        })
        console.log(error, '<-- error delete user details')
    }
}

module.exports = { createUserDetail, getAllUserDetail, getUserDetailById, updateUserDetail, deleteUserDetail }