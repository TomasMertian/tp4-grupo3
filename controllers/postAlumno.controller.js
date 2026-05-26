const fs = require('fs').promises
const { AlumnoModel } = require('../models/alumno.model')
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

    const alumnos = JSON.parse(datos)

    const yaExiste = alumnos.find((a) => a.legajo === legajo)
    if (yaExiste) {
      return res
        .status(409)
        .json({ error: 'ya existe un alumno con ese legajo' })
    }

    alumnos.push(newAlumno)
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2))
    return res
      .status(201)
      .json({ msg: 'alumno creado con exito', alumno: newAlumno })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'solicitud invalida' })
  }
}

module.exports = { postAlumno }
