const { Router } = require('express')
const { getMateriaAll, getMateriaById, postMateria } = require('../../controllers/materia.controller')

const rutas = Router()

rutas.get('/', getMateriaAll)
rutas.post('/', postMateria)
rutas.get('/:idMateria', getMateriaById)

module.exports = rutas