import { PersonaModel } from './persona.model.ts'
export class AlumnoModel extends PersonaModel {
  readonly legajo: number

  constructor(nombre: string, apellido: string, email: string, legajo: number) {
    super(nombre, apellido, email)

    this.legajo = legajo
  }

  public getLegajo(): number {
    return this.legajo
  }
}
