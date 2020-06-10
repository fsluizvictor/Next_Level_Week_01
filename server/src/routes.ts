import express, { request, response } from 'express'
import { celebrate, Joi } from 'celebrate'

import multer from 'multer'
import multerConfig from './config/multer'

import PointsController from './controllers/PointsControllers'
import ItemsController from './controllers/ItemsControllers'

const routes = express.Router()
const upload = multer(multerConfig)

const poinsController = new PointsController()
const itemsController = new ItemsController()

routes.get('/items', itemsController.index)

//routes.post('/points', poinsController.create)
routes.get('/points', poinsController.index)
routes.get('/points/:id', poinsController.show)

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    poinsController.create
)

export default routes