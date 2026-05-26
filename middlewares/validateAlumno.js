const validateAlumno = (req, res, next) => {
  const errors = []

  if (!req.body.legajo || req.body.legajo.trim() === '') {
    errors.push('legajo inexistente o vacio')
  }
  if (!req.body.nombre || req.body.nombre.trim() === '') {
    errors.push('nombre inexistente')
  }
  if (!req.body.apellido || req.body.apellido.trim() === '') {
    errors.push('apellido inexistente')
  }
  if (!req.body.fechaAlta || req.body.fechaAlta.trim() === '') {
    errors.push('fecha inexistente')
  }
  if (isNaN(Date.parse(req.body.fechaAlta))) {
    errors.push('el tipo de fecha Alta debe ser una fecha')
  }

  if (typeof req.body.isActive !== 'boolean') {
    errors.push('isActive debe ser un booleano')
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}
module.exports = { validateAlumno }
