# API REST - Administración de Estudiantes

API REST construida con **Express.js** para gestionar una lista de estudiantes. Los datos se almacenan en un **array de JavaScript dentro de `index.js`** (datos quemados / hardcoded), por lo que **no se utiliza base de datos**. Cada vez que el servidor se reinicia, los datos vuelven a su estado inicial.

## 📋 Descripción del proyecto

El servidor expone endpoints para **consultar, agregar, actualizar y eliminar** estudiantes, respondiendo siempre en formato **JSON** con el código de estado HTTP apropiado.

Cada estudiante tiene la siguiente estructura:

```json
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Pérez",
  "age": 20,
  "email": "juan.perez@email.com",
  "phone": "+503 7000 0000",
  "address": {
    "country": "El Salvador",
    "city": "San Salvador"
  },
  "isActive": true,
  "courses": ["Matemáticas", "Programación", "Base de Datos"]
}
```

## 🚀 Cómo ejecutarlo

1. Clonar o descargar el proyecto.
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor:
   ```bash
   npm start
   ```
4. El servidor quedará disponible en:
   ```
   http://localhost:3000
   ```

> Puedes probar los endpoints con herramientas como **Postman**, **Insomnia** o `curl`.

## 📌 Tabla de endpoints disponibles

| Método | Endpoint                | Descripción                              | Código de éxito | Código de error |
|--------|--------------------------|-------------------------------------------|------------------|------------------|
| GET    | `/api/students`          | Obtener todos los estudiantes             | 200              | -                |
| GET    | `/api/students/:id`      | Obtener un estudiante por su ID           | 200              | 404              |
| POST   | `/api/students`          | Agregar un nuevo estudiante               | 201              | 400              |
| PUT    | `/api/students/:id`      | Actualizar un estudiante existente        | 200              | 404              |
| DELETE | `/api/students/:id`      | Eliminar un estudiante                    | 200              | 404              |

### Ejemplo de petición POST

```json
{
  "firstName": "Ana",
  "lastName": "López",
  "age": 21,
  "email": "ana.lopez@email.com",
  "phone": "+503 7333 3333",
  "address": {
    "country": "El Salvador",
    "city": "Mejicanos"
  },
  "isActive": true,
  "courses": ["Programación", "Inglés"]
}
```

## 🗂️ Estructura del proyecto

```
student-api/
├── index.js        # Configuración de Express, array de estudiantes y endpoints
├── package.json     # Dependencias y scripts del proyecto
├── .gitignore        # Archivos/carpetas excluidos del repositorio
└── README.md         # Documentación del proyecto
```

## ⚠️ Nota importante

Este proyecto **no utiliza base de datos**. Los estudiantes se almacenan en memoria (array de objetos JavaScript), por lo que cualquier cambio (agregar, actualizar, eliminar) **se pierde al reiniciar el servidor**.

## 🛠️ Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
