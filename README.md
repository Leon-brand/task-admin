# Task Admin App

Aplicación web para la gestión de tareas con autenticación de usuarios, desarrollada como prueba técnica utilizando React y Firebase.

---

## 📄 Descripción

Task Admin App permite a los usuarios registrarse, iniciar sesión y administrar sus tareas personales.  
Cada tarea cuenta con estado, prioridad, fecha de vencimiento y filtros dinámicos para una mejor organización.

La aplicación está diseñada siguiendo buenas prácticas de arquitectura front-end y manejo de estado, con una experiencia clara y funcional.

---

## ✨ Features

- Autenticación de usuarios (Firebase Auth)
- Registro e inicio de sesión
- Rutas protegidas
- CRUD de tareas
- Cambio de estado de tareas
- Eliminación con confirmación
- Filtros por estado y prioridad
- Indicador de tareas vencidas
- Persistencia en Firestore
- Diseño responsive

---

## 🛠️ Tecnologías

- React + Vite
- React Router
- Firebase Authentication
- Firebase Firestore
- JavaScript (ES6+)
- CSS puro

---

## 🚀 Deploy

La aplicación está desplegada en GitHub Pages:

👉 https://leon-brand.github.io/task-admin/

---

## ⚙️ Instalación y ejecución local

1. Clona el repositorio:


git clone https://github.com/Leon-brand/task-admin.git

Accede al directorio del proyecto:

cd TU_REPO


Instala las dependencias:

npm install


Crea el archivo de variables de entorno (ver sección siguiente).

Ejecuta la aplicación en modo desarrollo:

npm run dev


La aplicación estará disponible en:

http://localhost:5173

## 🔐 Variables de entorno

Para que la aplicación funcione correctamente es necesario configurar Firebase.

Crea un archivo .env en la raíz del proyecto.

Agrega las siguientes variables:

VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID


Estas variables se utilizan en la configuración de Firebase dentro del proyecto y no deben subirse al repositorio.

## 📂 Estructura del proyecto
src/
├── auth/            # Login, Register y rutas públicas/privadas
├── components/      # Componentes reutilizables (Navbar, etc.)
├── context/         # Contexto de autenticación
├── firebase/        # Configuración de Firebase
├── hooks/           # Hooks personalizados
├── tasks/
│   ├── components/  # Componentes relacionados con tareas
│   ├── pages/       # Vistas principales (Dashboard, CreateTask)
│   └── services/    # Servicios de Firestore
├── App.jsx
├── main.jsx
└── index.css

## 👤 Autor

Leon Velasco
Front-End Developer

React

Firebase

JavaScript
