import { PersonaModel } from './persona.model.ts'
export class AlumnoModel extends PersonaModel {
  readonly legajo: number
  readonly fechaAlta: Date
  protected modificacion: Date
  protected isActive: boolean
  constructor(
    nombre: string,
    apellido: string,
    email: string,
    legajo: number,
    fechaAlta: Date,
    modificacion: Date,
    isActive: boolean
  ) {
    super(nombre, apellido, email)

    this.legajo = legajo
    this.fechaAlta = fechaAlta
    this.modificacion = modificacion
    this.isActive = isActive
  }

  public getLegajo(): number {
    return this.legajo
  }

  public getFechaAlta(): Date {
    return this.fechaAlta
  }

  public getModificacion(): Date {
    return this.modificacion
  }

  public getIsActive(): string {
    if (this.isActive === true) {
      return 'activo'
    } else return 'inactivo'
  }

  public setModificacion(fechaModificar: Date): void {
    this.modificacion = fechaModificar
  }
  public setIsActive(respuesta: string): void {
    if (respuesta.toLowerCase() === 'no') this.isActive = false
    else if (respuesta.toLowerCase() === 'si') this.isActive = true
  }

  public getAllAttributes(): object {
    return {
      legajo: this.legajo,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      fechaAlta: this.fechaAlta,
      modificacion: this.modificacion,
      isActive: this.isActive
    }
  }
}
