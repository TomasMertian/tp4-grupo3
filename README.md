# TP N°4 — API REST con Node.js, Docker y Render

## Grupo 3 — Integrantes

- Tomás Mertian
- 
- 
- 
- 
- 

---

## Descripción del proyecto

API REST desarrollada con Node.js y Express que permite gestionar alumnos y materias
mediante endpoints CRUD. Los datos se persisten en archivos JSON. El proyecto está
dockerizado y desplegado en Render.

---

## Render

- 🚀 **Deploy en Render:** [https://tp4-grupo3.onrender.com](https://tp4-grupo3.onrender.com/)

---

## Metodología de trabajo con Git y GitHub

Se trabajó con la estrategia de **una rama por integrante**. Cada uno desarrolló
sus funcionalidades en su rama y abrió un Pull Request para mergear a `dev`.
Una vez aprobado el TP, se mergeó `dev` a `main` como entrega final.

---

## Distribución de carpetas

```
tp4-grupo3/
├── controllers/      # Lógica de cada endpoint
├── routes/           # Definición de rutas
├── middlewares/      # Validaciones
├── models/           # Clases TypeScript
├── data/             # JSONs (base de datos simulada)
├── core/             # Configuración del servidor
├── Dockerfile
└── app.js
```

# Alumno: Tomás Mertian.

### POST `/materias`

Crea e inserta una nueva materia en `sys-materias.json`.

La petición pasa primero por el middleware `validateMateria` y, si es válida, llega al controlador `postMateria`.

---

## Estructura del JSON — `sys-materias.json`

Ubicación: `./data/extras/sys-materias.json`

```json
[
  {
    "idMateria": "PROG3",
    "nombre": "Programación III",
    "cuatrimestre": 1
  }
]
```

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `idMateria` | `string` | Identificador único de la materia |
| `nombre` | `string` | Nombre completo de la materia |
| `cuatrimestre` | `number` | Cuatrimestre: `1` o `2` |

---

## Modelo — `materia.model.ts`

Ubicación: `./models/extras/materia.model.ts`

Encapsula los datos de una materia con getters, setters y `getAllAttributes()` para serializar el objeto a JSON.

```tsx
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
    return { idMateria: this.idMateria, nombre: this.nombre, cuatrimestre: this.cuatrimestre }
  }
}
```

| Método | Descripción |
| --- | --- |
| `constructor(...)` | Inicializa los tres atributos privados. |
| `getX() / setX()` | Getters y setters para cada atributo. |
| `getAllAttributes()` | Devuelve un objeto plano listo para guardar en el JSON. |

---

## Middleware — `validateMateria.js`

Ubicación: `./middlewares/validateMateria.js`

Valida el `req.body` antes de llegar al controlador. Si hay errores, responde `400` con un array de mensajes y corta la cadena.

```jsx
const validateMateria = (req, res, next) => {
  const errors = []

  if (!req.body.idMateria?.trim())
    errors.push('idMateria es requerido y debe ser un string no vacío')

  if (!req.body.nombre?.trim())
    errors.push('nombre es requerido y debe ser un string no vacío')

  if (
    req.body.cuatrimestre == null ||
    typeof req.body.cuatrimestre !== 'number' ||
    !Number.isInteger(req.body.cuatrimestre) ||
    req.body.cuatrimestre < 1 ||
    req.body.cuatrimestre > 2
  )
    errors.push('cuatrimestre es requerido y debe ser un número entero entre 1 y 2')

  if (errors.length > 0) return res.status(400).json({ errors })

  next()
}
```

- **`idMateria` y `nombre`**: se usa `?.trim()` para verificar que sean strings con contenido real.
- **`cuatrimestre`**: debe existir, ser de tipo `number`, entero, y valer `1` o `2`.
- Si hay errores se responde `400` con todos los mensajes. Si no, se llama a `next()`.

---

## Ruta — `materia.routes.js`

Ubicación: `./routes/extras/materia.routes.js`

```jsx
rutas.post('/', validateMateria, postMateria)
```

Express encadena los middlewares en orden: primero `validateMateria` y, si pasa, `postMateria`. Esto separa la validación de la lógica de negocio.

---

## Controlador — `postMateria`

Ubicación: `./controllers/materia.controller.js`

```jsx
const postMateria = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    if (materias.find((m) => m.idMateria === req.body.idMateria))
      return res.status(409).json({ msg: `Ya existe una materia con ID ${req.body.idMateria}` })

    const materia = new MateriaModel(req.body.idMateria, req.body.nombre, req.body.cuatrimestre)
    materias.push(materia.getAllAttributes())

    await fs.writeFile('./data/extras/sys-materias.json', JSON.stringify(materias, null, 2))

    return res.status(201).json(materia.getAllAttributes())
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo crear la materia' })
  }
}
```

1. Lee el JSON y parsea el array de materias.
2. Verifica que no exista ya una materia con el mismo `idMateria` → `409` si hay duplicado.
3. Instancia `MateriaModel` y agrega la nueva materia al array.
4. Sobreescribe el JSON y responde `201` con la materia creada.
5. El `try/catch` captura cualquier error de I/O y devuelve `500`.

---

## Respuestas HTTP

| Código | Situación |
| --- | --- |
| `201` | Materia creada exitosamente. |
| `400` | Datos inválidos (middleware). |
| `409` | Ya existe una materia con ese `idMateria`. |
| `500` | Error interno al leer o escribir el archivo JSON. |

---

## Postman

### POST exitoso — `201 Created`

> ![Captura Postman codigo 201](https://i.imgur.com/yP864hd.png)

---

### Validación fallida — `400 Bad Request`

> ![Captura Postman codigo 400](https://i.imgur.com/d93KOnr.png)

---

### Validación fallida — `409 Conflict`

> ![Captura Postman codigo 409](https://i.imgur.com/hOOc47u.png)