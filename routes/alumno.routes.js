const { Router } = require('express')
const {
  getAlumnoAll,
  getAlumnoById,
  deleteAlumno
} = require('../controllers/alumno.controller')

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.delete('/:legajo', deleteAlumno)

module.exports = rutas
