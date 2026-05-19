const fs = require('fs').promises

const getMateriaAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    return res.status(200).json(materias)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudieron obtener las materias' })
  }
}

const getMateriaById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    const { idMateria } = req.params

    const materia = materias.find(m => m.idMateria === idMateria)

    if (!materia) {
      return res.status(404).json({ msg: `No existe la materia con ID ${idMateria}` })
    }

    return res.status(200).json(materia)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo obtener la materia' })
  }
}

module.exports = { getMateriaAll, getMateriaById }