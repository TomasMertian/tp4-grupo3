export class MateriaModel {
  constructor(
    private idMateria: string,
    private nombre: string,
    private cuatrimestre: number
  ) {}

  public getIdMateria(): string {
    return this.idMateria
  }
  public setIdMateria(idMateria: string): void {
    this.idMateria = idMateria
  }

  public getNombre(): string {
    return this.nombre
  }
  public setNombre(nombre: string): void {
    this.nombre = nombre
  }

  public getCuatrimestre(): number {
    return this.cuatrimestre
  }
  public setCuatrimestre(cuatrimestre: number): void {
    this.cuatrimestre = cuatrimestre
  }

  public getAllAttributes(): object {
    return {
      idMateria: this.idMateria,
      nombre: this.nombre,
      cuatrimestre: this.cuatrimestre
    }
  }

  public static validate(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data || typeof data !== 'object') {
      errors.push('Los datos deben ser un objeto')
      return { valid: false, errors }
    }

    if (
      !data.idMateria ||
      typeof data.idMateria !== 'string' ||
      data.idMateria.trim() === ''
    ) {
      errors.push('idMateria es requerido y debe ser un string no vacío')
    }

    if (
      !data.nombre ||
      typeof data.nombre !== 'string' ||
      data.nombre.trim() === ''
    ) {
      errors.push('nombre es requerido y debe ser un string no vacío')
    }

    if (
      data.cuatrimestre === undefined ||
      data.cuatrimestre === null ||
      typeof data.cuatrimestre !== 'number' ||
      !Number.isInteger(data.cuatrimestre) ||
      data.cuatrimestre < 1 ||
      data.cuatrimestre > 2
    ) {
      errors.push(
        'cuatrimestre es requerido y debe ser un número entero entre 1 y 2'
      )
    }

    return { valid: errors.length === 0, errors }
  }
}
