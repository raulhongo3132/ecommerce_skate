# Ecommerce Skate 🛹

Frontend de un sistema de comercio electrónico orientado a la venta de productos relacionados con skate.  
Proyecto desarrollado como práctica académica y base para futura integración con servicios backend.

---

## 📌 Descripción

Este proyecto corresponde a la capa **frontend** de un sistema ecommerce.  
Incluye:

- Navegación con control de sesión
- Gestión básica de autenticación en el cliente
- Vista de productos
- Flujo de carrito y checkout protegido
- Estructura preparada para futura integración con API REST y autenticación JWT

---

## 🛠 Tecnologías utilizadas

- React
- Vite
- JavaScript (ES6+)
- CSS
- Node.js
- npm

---

## 📋 Requisitos del sistema

Antes de ejecutar el proyecto necesitas tener instalado:

- **Node.js** (versión LTS recomendada)
- **npm**
- **Git**
- Navegador moderno (Chrome, Firefox, Edge)

---

# 🔧 Instalación del entorno

## 🪟 Windows

### 1. Instalar Node.js

Descargar desde:

https://nodejs.org

Instalar la versión **LTS**.

Verificar instalación:

```bash
node -v
npm -v
```
### 2. Instalar Git

Descargar desde:

https://git-scm.com/download/win

Verificar:
```bash
git --version
```

### 🐧 Linux (Ubuntu / Debian / Zorin)
1. Instalar Node.js y npm

```bash
sudo apt update
sudo apt install nodejs npm -y
```

Verificar:

```bash
node -v
npm -v
```

Nota: Para versiones más recientes se recomienda usar nvm.

### 2. Instalar Git

```bash
sudo apt install git -y
```

### 📦 Instalación del proyecto

Clonar el repositorio:

```bash
git clone git@github.com:raulhongo3132/ecommerce_skate.git
cd ecommerce_skate
```

Instalar dependencias:

```bash
npm install
```

▶️ Ejecución en entorno de desarrollo

```bash
npm run dev
```


El servidor de desarrollo se ejecutará normalmente en:

http://localhost:5173


(Revisar la consola por el puerto exacto.)

🔐 Control de sesión

El nombre del usuario autenticado se muestra en el navbar.

El cierre de sesión destruye la sesión activa.

Las rutas protegidas (como checkout) requieren autenticación.

La estructura está preparada para futura implementación con JWT.

📁 Estructura general del proyecto
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── context/
 └── App.jsx

🚀 Estado del proyecto

Versión actual:

Frontend funcional

Flujo de autenticación local

Preparado para integración futura con backend y servicios web