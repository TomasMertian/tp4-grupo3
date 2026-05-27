const fs = require('fs').promises
const { AlumnoModel } = require('../models/alumno.model')

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

//-------  PUT/Alumno/:id -------//

const updateAlumno = async (req, res) => {
  try {
    // Se toma el legajo desde los parámetros de la URL y los nuevos datos desde el body de la petición
    const { legajo } = req.params
    const { nombre, apellido, email, isActive } = req.body

    //Validación: Si se envia un legajo en el body, se verifica que coincida con el de la URL.
    //Evita que se intente modificar el número de legajo original
    if (req.body.legajo && req.body.legajo !== Number(legajo)) {
      return res.status(400).json({
        error: 'No se permite modificar el número de legajo.'
      })
    }

    // Lee el JSON y transforma el texto en un array de objetos
    const datos = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(datos)

    // Busca al alumno existente dentro del array mediante el número de legajo
    const alumnoOriginal = alumnos.find((a) => a.legajo === Number(legajo))

    // Control de existencia: Si no se encuentra, retorna un estado 404 (Not Found)
    if (!alumnoOriginal) {
      return res.status(404).json({
        msg: `No existe el alumno con el legajo ${legajo}`
      })
    }

    //Creo la nueva instancia
    const alumnoModificado = new AlumnoModel(
      nombre || alumnoOriginal.nombre,
      apellido || alumnoOriginal.apellido,
      email || alumnoOriginal.email,
      alumnoOriginal.legajo, //Mantiene el legajo
      alumnoOriginal.fechaAlta, // Mantiene la fecha de alta
      new Date().toISOString().split('T')[0], //Actualiza la información al formato del JSON
      isActive !== undefined ? isActive : alumnoOriginal.isActive
    )

    // Busca el índice o posición del alumno viejo dentro del array original
    const indice = alumnos.findIndex((a) => a.legajo === Number(legajo))
    alumnos[indice] = alumnoModificado //reemplaza el elemento viejo por la nueva instancia

    // sobrescribe el JSON con el array actualizado
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2))

    // Muestra un mensaje de control por la consola del servidor
    console.log(`[FLAG] Alumno con legajo ${legajo} actualizado con éxito.`)

    //responde con un estado HTTP 200 (OK), enviando confirmación de éxito y el objeto modificado
    return res.status(200).json({
      msg: 'Alumno modificado con exito',
      alumno: alumnoModificado
    })
  } catch (error) {
    // Manejo de excepciones: Si ocurre un error en el bloque try, se captura y se responde con un estado HTTP 500
    console.log(error)
    return res.status(500).json({
      error: 'solicitud invalida.'
    })
  }
}

module.exports = { getAlumnoAll, getAlumnoById, deleteAlumno, updateAlumno }
