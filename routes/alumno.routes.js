const { Router } = require('express')
const {
  getAlumnoAll,
  getAlumnoById,
  deleteAlumno
} = require('../controllers/alumno.controller')

const { postAlumno } = require('../controllers/postAlumno.controller')
const { validateAlumno } = require('../middlewares/validateAlumno')
const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.delete('/:legajo', deleteAlumno)

rutas.post('/', validateAlumno, postAlumno)

module.exports = rutas
