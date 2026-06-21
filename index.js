const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// -----------------------------------------------------------------------------
// Datos quemados (hardcoded) - Array de estudiantes
// NOTA: No se usa base de datos. Al reiniciar el servidor, los datos vuelven
// a este estado inicial.
// -----------------------------------------------------------------------------
let students = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Pérez",
    age: 20,
    email: "juan.perez@email.com",
    phone: "+503 7000 0000",
    address: {
      country: "El Salvador",
      city: "San Salvador",
    },
    isActive: true,
    courses: ["Matemáticas", "Programación", "Base de Datos"],
  },
  {
    id: 2,
    firstName: "María",
    lastName: "González",
    age: 22,
    email: "maria.gonzalez@email.com",
    phone: "+503 7111 1111",
    address: {
      country: "El Salvador",
      city: "Santa Tecla",
    },
    isActive: true,
    courses: ["Programación", "Redes"],
  },
  {
    id: 3,
    firstName: "Carlos",
    lastName: "Ramírez",
    age: 19,
    email: "carlos.ramirez@email.com",
    phone: "+503 7222 2222",
    address: {
      country: "El Salvador",
      city: "Soyapango",
    },
    isActive: false,
    courses: ["Matemáticas", "Física"],
  },
];

// Helper para generar un nuevo id (mientras dure la sesión del servidor)
let nextId = students.length + 1;

// -----------------------------------------------------------------------------
// Endpoint raíz - información rápida de la API
// -----------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API REST - Administración de Estudiantes",
    endpoints: {
      "GET /api/students": "Obtener todos los estudiantes",
      "GET /api/students/:id": "Obtener un estudiante por ID",
      "POST /api/students": "Agregar un nuevo estudiante",
      "PUT /api/students/:id": "Actualizar un estudiante existente",
      "DELETE /api/students/:id": "Eliminar un estudiante",
    },
  });
});

// -----------------------------------------------------------------------------
// GET ALL - Obtener todos los estudiantes
// -----------------------------------------------------------------------------
app.get("/api/students", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// -----------------------------------------------------------------------------
// GET BY ID - Obtener un estudiante específico
// -----------------------------------------------------------------------------
app.get("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `No se encontró un estudiante con id ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

// -----------------------------------------------------------------------------
// POST - Agregar un nuevo estudiante
// -----------------------------------------------------------------------------
app.post("/api/students", (req, res) => {
  const { firstName, lastName, age, email, phone, address, isActive, courses } =
    req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      success: false,
      message: "Los campos firstName, lastName y email son obligatorios",
    });
  }

  const newStudent = {
    id: nextId++,
    firstName,
    lastName,
    age: age ?? null,
    email,
    phone: phone ?? "",
    address: address ?? { country: "", city: "" },
    isActive: isActive ?? true,
    courses: courses ?? [],
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Estudiante creado correctamente",
    data: newStudent,
  });
});

// -----------------------------------------------------------------------------
// PUT - Actualizar un estudiante existente
// -----------------------------------------------------------------------------
app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `No se encontró un estudiante con id ${id}`,
    });
  }

  const {
    firstName,
    lastName,
    age,
    email,
    phone,
    address,
    isActive,
    courses,
  } = req.body;

  const updatedStudent = {
    ...students[index],
    firstName: firstName ?? students[index].firstName,
    lastName: lastName ?? students[index].lastName,
    age: age ?? students[index].age,
    email: email ?? students[index].email,
    phone: phone ?? students[index].phone,
    address: address ?? students[index].address,
    isActive: isActive ?? students[index].isActive,
    courses: courses ?? students[index].courses,
  };

  students[index] = updatedStudent;

  res.status(200).json({
    success: true,
    message: "Estudiante actualizado correctamente",
    data: updatedStudent,
  });
});

// -----------------------------------------------------------------------------
// DELETE - Eliminar un estudiante
// -----------------------------------------------------------------------------
app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `No se encontró un estudiante con id ${id}`,
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Estudiante eliminado correctamente",
    data: deletedStudent,
  });
});

// -----------------------------------------------------------------------------
// Manejo de rutas no encontradas (404)
// -----------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// -----------------------------------------------------------------------------
// Iniciar servidor
// -----------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
