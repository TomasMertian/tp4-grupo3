const fs = require('fs').promises
import { AlumnoModel } from '../models/alumno.model'
import { validateAlumno } from '../middlewares/validateAlumno'
const postAlumno = async (req, res) => {
  try {
    const {
      legajo,
      nombre,
      apellido,
      email,
      fechaAlta,
      modificacion,
      isActive
    } = req.body

    const newAlumno = new AlumnoModel(
      nombre,
      apellido,
      email,
      legajo,
      fechaAlta,
      modificacion,
      isActive
    )

    const datos = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumno = JSON.parse(datos)
    alumno.push(newAlumno)
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumno, null, 2))
    return res
      .status(200)
      .json({ msg: 'alumno creado con exito', alumno: newAlumno })
  } catch (error) {
    return res.status(500).json({ error: 'solicitud invalida' })
  }
}
