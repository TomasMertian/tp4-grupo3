const { Router } = require('express')
const { getMateriaAll, getMateriaById, postMateria } = require('../../controllers/materia.controller')
const { validateMateria } = require('../../middlewares/validateMateria')

const rutas = Router()

rutas.get('/', getMateriaAll)
rutas.post('/', validateMateria, postMateria)
rutas.get('/:idMateria', getMateriaById)

module.exports = rutas