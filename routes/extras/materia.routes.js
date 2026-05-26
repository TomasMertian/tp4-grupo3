const { Router } = require('express')
const {
  getMateriaAll,
  getMateriaById,
  updateMateria
} = require('../../controllers/materia.controller')

const rutas = Router()

rutas.get('/', getMateriaAll)
rutas.post('/', validateMateria, postMateria)
rutas.get('/:idMateria', getMateriaById)
rutas.put('/:idMateria', updateMateria)

module.exports = rutas
