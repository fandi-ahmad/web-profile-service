const { Setup } = require('../models')

const getAllSetup = async (req, res) => {
    try {
        const { key } = req.query

        const dataResult = (msg, dataset) => {
            return {
                status: 'ok',
                message: msg ||'successfully',
                data: dataset || null
            }
        }

        if (key == undefined) {
            const allSetup = await Setup.findAll()
            const result = dataResult('get all setup is successfully', allSetup)
            res.json(result)
        } else {
            const setupByKey = await Setup.findAll({
                where: { key: key }
            })
            const result = dataResult('get setup by key is successfully', setupByKey)
            res.json(result)
        }

    } catch (error) {
        res.status(400)
        // console.log(error, '<-- error get service')
    }
}

const getSetupById = async (req, res) => {
    try {
        console.log(req.params, '<-- req get params')
        const { id } = req.params
        const setup = await Setup.findByPk(id)
        const result = {
            status: 'ok',
            message: 'get setup by id successfully',
            data: setup
        }
        res.json(result)
    } catch (error) {
        res.status(400)
        // console.log(error, '<-- error get service by id')
    }
}


const createSetup = async (req, res) => {
    try {
        const { key, value } = req.body
        const newSetup = await Setup.create({
            key: key,
            value: value
        })
        res.status(201).json({
            status: 'ok',
            data: newSetup
        })
    } catch (error) {
        res.status(400)
        // console.log(error, '<--- error create service')
    }
}

const deleteSetup = async (req, res) => {
    try {
        const { id } = req.params
        const setup = await Setup.findByPk(id)
        if (!setup) {
            return res.status(404).json({
                status: 'failed',
                message: 'data is not found'
            })
        }
        setup.destroy()
        res.json({
            status: 'ok',
            message: 'delete successfully'
        })
    } catch (error) {
        res.status(400)
        // console.log(error, '<--- error delete service')
    }
}

const updateSetup = async (req, res) => {
    try {
        const { id, key, value } = req.body
        const setup = await Setup.findByPk(id)

        setup.key = key
        setup.value = value
        setup.save()

        res.json({
            status: 'ok',
            message: 'setup updated successfully'
        })
    } catch (error) {
        res.status(400)
        // console.log(error, '<--- error update service')
    }
}

module.exports = { getAllSetup, getSetupById, createSetup, updateSetup, deleteSetup }