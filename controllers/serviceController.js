const { Service } = require('../models')
const path = require('path')
const fs = require('fs')

const getAllService = async (req, res) => {
    try {
        const data = await Service.findAll()
        const result = {
            status: 'ok',
            data: data
        }
        res.json(result)
    } catch (error) {
        res.status(400)
        // console.log(error, '<-- error get service')
    }
}

const getServiceById = async (req, res) => {
    try {
        const { id } = req.params
        const service = await Service.findByPk(id)
        const result = {
            status: 'ok',
            data: service
        }
        res.json(result)
    } catch (error) {
        res.status(400)
        // console.log(error, '<-- error get service by id')
    }
}

const createService = async (req, res) => {
    try {
        const { name, description } = req.body
        const image = req.file.path
        const newService = await Service.create({
            name: name,
            description: description,
            image: image
        })
        res.status(201).json({
            status: 'ok',
            data: {
                id: newService.id,
                name: newService.name,
                description: newService.description,
                image: newService.image,
                createdAt: newService.createdAt,
                updatedAt: newService.updatedAt
            }
        })
    } catch (error) {
        res.status(400)
        // console.log(error, '<--- error create service')
    }
}

const removeImage = (filePath) => {
    // get location image
    filePath = path.join(__dirname, '..', filePath)

    // remove file by path
    fs.unlink(filePath, err => console.log(err))
}

const deleteService = async (req, res) => {
    try {
        const { id } = req.params
        const service = await Service.findByPk(id)
        if (!service) {
            return res.status(404).json({
                status: 'failed',
                message: 'data is not found'
            })
        }
        removeImage(service.image)
        service.destroy()
        res.json({
            status: 'ok',
            message: 'delete successfully'
        })
    } catch (error) {
        res.status(400)
        // console.log(error, '<--- error delete service')
    }
}

const updateService = async (req, res) => {
    try {
        const { id, name, description } = req.body
        const image = req.file.path
        const service = await Service.findByPk(id)

        removeImage(service.image)
        service.name = name
        service.description = description
        service.image = image
        service.save()

        res.json({
            status: 'ok',
            message: 'service updated successfully'
        })
    } catch (error) {
        res.status(400)
        // console.log(error, '<--- error update service')
    }
}

module.exports = { getAllService, createService, deleteService, updateService, getServiceById }