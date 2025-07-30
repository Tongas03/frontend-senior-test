# 💼 Wallet – Frontend Technical Challenge

Este repositorio contiene el desarrollo de una **Wallet Digital**, construida con **Next.js**, **TypeScript** y otras tecnologías modernas de frontend. El objetivo es replicar el diseño provisto en Figma y simular funcionalidades básicas de transferencias entre usuarios.

---

## 📑 Navegación

- [🧠 Objetivo](#-objetivo)
- [🛠️ Tecnologías Usadas](#️-tecnologías-usadas)
- [📱 Funcionalidades Principales](#-funcionalidades-principales)
- [🏗️ Arquitectura y Organización](#-arquitectura-y-organización)
- [🚀 Instalación y Ejecución](#-instalación-y-ejecución)
- [📡 API y Persistencia](#-api-y-persistencia)
- [💡 Consideraciones Extra](#-consideraciones-extra)

---

## 🧠 Objetivo

Desarrollar la aplicación **Wallet** utilizando **React** o **Next.js**, replicando el diseño proporcionado en Figma y simulando funcionalidades de transferencias entre usuarios.

> 🎨 Diseño Figma: [Wallet en Figma](https://www.figma.com/design/ppzcbVZJLzYfEvw3Yokt9N/WayniWallet)

---

## 🛠️ Tecnologías Usadas

- **Next.js** + **TypeScript**
- **Hooks** y componentes funcionales (ES6+)
- **Tailwind CSS** para estilos
- **TanStack Query (React Query)** para manejo de datos asincrónicos
- **Zustand** como manejador de estado global
- **IndexedDB** para persistencia local
- **randomuser.me API** como fuente de usuarios
- **Next.js App Router** para rutas

---

## 📱 Funcionalidades Principales

### 1. 🏠 Home Screen
- Mostrar nombre y avatar del usuario principal.
- Mostrar el balance actual (con persistencia local).
- Listar mínimo 10 contactos frecuentes para transferencias rápidas.
- Al seleccionar un contacto, redirige a pantalla de transferencia rápida.
- Mostrar historial de transacciones recientes con scroll.
- (Opcional) Skeletons para mejorar la carga de usuarios.

### 2. 💸 Transfers Screen
- Listado completo de transferencias realizadas.
- Visualización de avatar, nombre, fecha y monto.
- (Opcional) Filtro por fecha.

### 3. 👤 Profile Screen
- Mostrar datos personales del usuario:
  - Nombre, contacto, ubicación.
  - ID único del usuario.

---

## 🏗️ Arquitectura y Organización

La aplicación sigue principios de **arquitectura limpia** y **SOLID**, asegurando modularidad y facilidad de mantenimiento. Las carpetas principales son:

```
/app          → Rutas y páginas (Next.js App Router)
/components   → Componentes reutilizables (UI y dominio)
/features     → Funcionalidades agrupadas por dominio (user, wallet, profile)
/stores       → Estados globales (Zustand)
/lib          → Lógica externa como API, persistencia, helpers
/types        → Tipos e interfaces de TypeScript
/utils        → Funciones utilitarias
```

---

## 🚀 Instalación y Ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Tongas03/frontend-senior-test
   cd frontend-senior-test
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar la aplicación:
   ```bash
   npm run dev
   ```

4. Acceder en tu navegador:
   ```
   http://localhost:3000
   ```

---

## 📡 API y Persistencia

- Los datos de usuario principal y contactos se obtienen de la API pública: [https://randomuser.me](https://randomuser.me).
- El balance y las transacciones se persisten utilizando **IndexedDB** para mantener estado entre sesiones.
- TanStack Query se utiliza para cacheo y manejo eficiente de datos.

---

## 💡 Consideraciones Extra

- Código modular y reutilizable.
- Componentes desacoplados y testeables.
- Arquitectura preparada para escalabilidad.
- Features opcionales implementadas para sumar puntos:
  - Skeletons de carga
  - Filtro por fechas
  - Persistencia avanzada

---

## 🧑‍💻 Autor

Desarrollado por [Gastón Raimundo] – Prueba técnica Frontend Senior Developer