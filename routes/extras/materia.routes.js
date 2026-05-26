const { Router } = require('express')

const {
  getMateriaAll,
  getMateriaById,
  postMateria,
  updateMateria
} = require('../../controllers/materia.controller')
const { validateMateria } = require('../../middlewares/validateMateria')

const { validateMateria } = require('../../middlewares/validateMateria')

const rutas = Router()

rutas.get('/', getMateriaAll)

rutas.post('/', validateMateria, postMateria)

rutas.get('/:idMateria', getMateriaById)

rutas.put('/:idMateria', updateMateria)

module.exports = rutas
