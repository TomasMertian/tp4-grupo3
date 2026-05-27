const fs = require('fs').promises

const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    // obtiene los query params de la URL
    const { apellido, isActive } = req.query

    // copia el array original para poder filtrarlo
    let alumnosFiltrados = alumnos

    // filtra por apellido si se recibe uno por query params
    if (apellido) {
      alumnosFiltrados = alumnosFiltrados.filter(
        (a) => a.apellido.toLowerCase() === apellido.toLowerCase()
      )
    }

    // filtra por estado activo si se recibe el query param
    if (isActive) {
      alumnosFiltrados = alumnosFiltrados.filter(
        (a) => a.isActive === (isActive === 'true')
      )
    }

    return res.status(200).json(alumnosFiltrados)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se puedieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const legajoId = alumnos.find(
      (a) => a.legajo /* .toString() */ === Number(legajo)
    )

    if (!legajoId) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(legajoId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo obtener el detalle del alumno con legajo n° ${legajo}`
    })
  }
}

const deleteAlumno = async (req, res) => {
  try {
    const { legajo } = req.params

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    // comprueba si el alumno existe usando el legajo
    const existeAlumno = alumnos.find((a) => a.legajo === Number(legajo))

    // si no existe, da un error 404 (not found) y corta la ejecucion
    if (!existeAlumno) {
      return res.status(404).json({
        msg: `No se puede eliminar: No existe el alumno con el legajo ${legajo}`
      })
    }

    // si existe, guarda a todos los alumnos excepto el que coincide con el legajo que se quiere eliminar
    const alumnosActualizados = alumnos.filter(
      (a) => a.legajo !== Number(legajo)
    )

    // sobreecribe el archivo json con el arreglo actualizado
    await fs.writeFile(
      './data/alumnos.json',
      JSON.stringify(alumnosActualizados, null, 2),
      'utf8'
    )

    // devuelve el codigo 200 confirmando que se elimino correctamente
    return res.status(200).json({
      msg: `El alumno con legajo ${legajo} fue eliminado correctamente`
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: `No se pudo eliminar el alumno con legajo n° ${req.params.legajo}`
    })
  }
}

module.exports = { getAlumnoAll, getAlumnoById, deleteAlumno }
