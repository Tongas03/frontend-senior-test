# 💼 Wallet – Frontend Technical Challenge

Este repositorio contiene el desarrollo de una **Wallet Digital**, construida con **Next.js**, **TypeScript** y tecnologías modernas de frontend. El objetivo fue replicar el diseño provisto en Figma y simular funcionalidades clave de una billetera digital.

---

## 📑 Navegación

- [🧠 Objetivo](#-objetivo)
- [🛠️ Tecnologías Usadas](#️-tecnologías-usadas)
- [📱 Funcionalidades Principales](#-funcionalidades-principales)
- [🏗️ Arquitectura y Organización](#-arquitectura-y-organización)
- [🧱 Patrón de Arquitectura](#-patrón-de-arquitectura)
- [🚀 Instalación y Ejecución](#-instalación-y-ejecución)
- [📡 API y Persistencia](#-api-y-persistencia)
- [💎 Mejoras Implementadas](#-mejoras-implementadas)
- [📂 Estructura Destacada](#-estructura-destacada)
- [🧪 Testing](#-testing)
- [🧑‍💻 Autor](#-autor)

---

## 🧠 Objetivo

Desarrollar la aplicación **Wallet** utilizando **React/Next.js**, replicando el diseño proporcionado en Figma y simulando transacciones entre usuarios persistidas localmente.

> 🎨 Diseño Figma: [Wallet en Figma](https://www.figma.com/design/ppzcbVZJLzYfEvw3Yokt9N/WayniWallet)

---

## 🛠️ Tecnologías Usadas

- **Next.js 15 App Router**
- **TypeScript**
- **Tailwind CSS**
- **TanStack React Query v5**
- **Zustand** (manejo global de estado)
- **IndexedDB** (via Dexie)
- **html2canvas** (captura de pantalla)
- **randomuser.me** (mock de usuarios)

---

## 📱 Funcionalidades Principales

### 1. 🏠 Home Screen

- Mostrar nombre y avatar del usuario principal.
- Mostrar el balance actual persistente.
- Listar 10 contactos frecuentes.
- Historial de transacciones con skeleton y scroll.
- Navegación rápida hacia contactos.

### 2. 💸 Transfers Screen

- Pagina las transferencias con scroll infinito.
- Muestra avatar, nombre, fecha, monto y detalles.
- Filtro por fecha: “Hoy”, “Ayer”, “Últimos 5 días”, “Todos”.
- Skeletons condicionales en carga inicial.

### 3. ✅ Transferencia Exitosa

- Muestra detalle de transferencia confirmada.
- Componente duplicado para capturar pantalla sin avatar.
- Botón para descargar captura (`html2canvas` + estado temporal).

### 4. 👤 Profile Screen

- Avatar y datos personales.
- ID único persistido.
- Skeleton en carga inicial.

---

## 🏗️ Arquitectura y Organización

El código sigue principios de **Clean Architecture** y **SOLID**, con una estructura modular y orientada a la reutilización:

```
/app          → App router de Next.js
/components   → Componentes compartidos
/features     → Funcionalidades agrupadas (wallet, user)
/hooks        → Hooks customizados
/stores       → Estados globales (Zustand)
/lib          → Conexiones con IndexedDB y helpers
/mocks        → Datos simulados de ejemplo
/types        → Tipos globales
/utils        → Funciones de formato y utilidades
/public       → Íconos y assets
```

---

## 🧱 Patrón de Arquitectura

Este proyecto aplica una **arquitectura basada en Feature-Driven Development (FDD)** con componentes desacoplados y lógica separada en capas:

- **Componentes UI**: contenidos en `components`, reutilizables y estilizados con Tailwind.
- **Estado global**: gestionado con **Zustand** por dominio (`useTransferStore`, `useUIStore`, etc.).
- **Lógica de negocio**: encapsulada en hooks (`usePaginatedTransfers`, `useUserFromDB`) y funciones de utilidad.
- **Persistencia local**: implementada con **Dexie (IndexedDB)** mediante funciones en `lib`.
- **Separación de concerns clara**: vista, estado, lógica y persistencia bien distribuidos.

Este enfoque mejora la escalabilidad, facilita los tests y permite mantener una base de código limpia y mantenible.

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

3. Ejecutar la app:
```bash
npm run dev
```

4. Acceder:
```
http://localhost:3000
```

---

## 📡 API y Persistencia

- Usuarios y contactos obtenidos de `https://randomuser.me`.
- Balance, contactos y transacciones persistidos en IndexedDB.
- `TanStack React Query v5` para caching eficiente.
- Estado de transferencia compartida manejado con `Zustand`.

---

## 💎 Mejoras Implementadas

- ✅ **Paginación con scroll infinito** para transferencias.
- ✅ **Filtro por fecha** en historial y transfers screen.
- ✅ **Skeletons de carga** inteligentes (una vez por sesión).
- ✅ **Distinción entre transacciones mock y reales**.
- ✅ **Captura de pantalla sin avatar** con `html2canvas`.
- ✅ **Separación de lógica de filtros** en componentes reutilizables.
- ✅ **Manejo global del último envío exitoso** con Zustand.
- ✅ **Componente de dropdown personalizado** sin dependencias externas.

---

## 📂 Estructura Destacada

```
/stores/useTransferStore.ts       → Estado global de la última transferencia
/components/TransactionFilterDropdown.tsx → Dropdown reutilizable
/hooks/usePaginatedTransfers.ts   → Transferencias con filtro y paginado
/pages/send/[id]/page.tsx         → Pantalla de envío
/pages/success/page.tsx           → Pantalla de transferencia exitosa
```

---

## 🧪 Testing

La aplicación incluye **cobertura de pruebas** para garantizar robustez y fiabilidad en los flujos críticos:

### ✅ Unit Testing (Jest)
- Componentes probados con **React Testing Library** y **ts-jest**.
- Mock de stores y hooks para pruebas aisladas.
- Ubicación: `components/__tests__/`

### ✅ E2E Testing (Cypress)
- Flujo completo de transferencia probado:
  1. Lectura de balance inicial
  2. Ejecución de transferencia
  3. Validación del balance actualizado
- Archivo principal: `cypress/e2e/transfer_flow.cy.ts`

### 📦 Scripts

```bash
npm run test        # Unitarios con Jest
npm run test:e2e    # Cypress GUI para E2E
```

---

## 🧑‍💻 Autor

Desarrollado por **Gastón Raimundo**  
Prueba técnica – *Frontend Senior Developer*