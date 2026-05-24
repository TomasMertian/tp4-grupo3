export class MateriaModel {
  constructor(
    private idMateria: string,
    private nombre: string,
    private cuatrimestre: number
  ) {}

  public getIdMateria(): string { return this.idMateria }
  public setIdMateria(idMateria: string): void { this.idMateria = idMateria }

  public getNombre(): string { return this.nombre }
  public setNombre(nombre: string): void { this.nombre = nombre }

  public getCuatrimestre(): number { return this.cuatrimestre }
  public setCuatrimestre(cuatrimestre: number): void { this.cuatrimestre = cuatrimestre }

  public getAllAttributes(): object {
    return {
      idMateria: this.idMateria,
      nombre: this.nombre,
      cuatrimestre: this.cuatrimestre
    }
  }
}
