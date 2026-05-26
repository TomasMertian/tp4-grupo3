const fs = require('fs').promises
const { MateriaModel } = require('../models/extras/materia.model')

const getMateriaAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    return res.status(200).json(materias)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener las materias' })
  }
}

const getMateriaById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    const { idMateria } = req.params

    const materia = materias.find((m) => m.idMateria === idMateria)

    if (!materia) {
      return res
        .status(404)
        .json({ msg: `No existe la materia con ID ${idMateria}` })
    }

    return res.status(200).json(materia)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo obtener la materia' })
  }
}

const postMateria = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')

    const materias = JSON.parse(data)

    const nuevaMateria = req.body

    materias.push(nuevaMateria)

    await fs.writeFile(
      './data/extras/sys-materias.json',
      JSON.stringify(materias, null, 2)
    )

    return res.status(201).json(nuevaMateria)
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo crear la materia'
    })
  }
}

const updateMateria = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')

    const materias = JSON.parse(data)

    const { idMateria } = req.params

    const datosActualizados = req.body

    const index = materias.findIndex((m) => m.idMateria === idMateria)

    if (index === -1) {
      return res.status(404).json({
        msg: `No existe la materia con ID ${idMateria}`
      })
    }

    materias[index] = {
      ...materias[index],
      ...datosActualizados
    }

    await fs.writeFile(
      './data/extras/sys-materias.json',
      JSON.stringify(materias, null, 2)
    )

    return res.status(200).json(materias[index])
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      error: 'No se pudo actualizar la materia'
    })
  }
}

const postMateria = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    if (materias.find((m) => m.idMateria === req.body.idMateria)) {
      return res
        .status(409)
        .json({ msg: `Ya existe una materia con ID ${req.body.idMateria}` })
    }

    const materia = new MateriaModel(
      req.body.idMateria,
      req.body.nombre,
      req.body.cuatrimestre
    )
    materias.push(materia.getAllAttributes())

    await fs.writeFile(
      './data/extras/sys-materias.json',
      JSON.stringify(materias, null, 2)
    )

    return res.status(201).json(materia.getAllAttributes())
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo crear la materia' })
  }
}

module.exports = { getMateriaAll, getMateriaById, postMateria, updateMateria }
