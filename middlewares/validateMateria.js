const validateMateria = (req, res, next) => {
  const errors = []

  if (!req.body.idMateria?.trim()) {
    errors.push('idMateria es requerido y debe ser un string no vacío')
  }

  if (!req.body.nombre?.trim()) {
    errors.push('nombre es requerido y debe ser un string no vacío')
  }

  if (
    req.body.cuatrimestre == null ||
    typeof req.body.cuatrimestre !== 'number' ||
    !Number.isInteger(req.body.cuatrimestre) ||
    req.body.cuatrimestre < 1 ||
    req.body.cuatrimestre > 2
  ) {
    errors.push('cuatrimestre es requerido y debe ser un número entero entre 1 y 2')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

module.exports = { validateMateria }
