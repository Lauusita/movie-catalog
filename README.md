
# 🎥 Movies - Final Project  
**Autores:** [Laura Arteta](https://github.com/tu-usuario) & [Juan Acosta](https://github.com/tu-usuario)  

---

## 📖 **Descripción**  
Movies es un proyecto desarrollado para gestionar películas y realizar operaciones CRUD con una base de datos relacional. Este proyecto utiliza **Prisma** como ORM y Docker para la gestión de servicios.  

---

## 🚀 **Tecnologías Utilizadas**  

- **Node.js** (NestJS como framework principal)  
- **Prisma** (ORM para PostgreSQL)  
- **PostgreSQL**  
- **Docker** y **Docker Compose**  
- **Visualizadores de bases de datos** como **TablePlus**  
- **TypeScript**  

---

## 📦 **Requisitos Previos**  
Antes de iniciar el proyecto, asegúrate de tener instalado lo siguiente:  

1. [Node.js](https://nodejs.org/)  
2. [Docker Desktop](https://www.docker.com/products/docker-desktop)  
3. Un cliente para bases de datos como [TablePlus](https://tableplus.com/) o [DBeaver](https://dbeaver.io/).  

---

## 🛠️ **Instalación y Configuración**  

### 1️⃣ Clonar el Repositorio  
```bash
git clone https://github.com/tu-repositorio/movies-project.git
cd movies-project
```

### 2️⃣ Instalar Dependencias  
```bash
npm install
```

### 3️⃣ Levantar la Base de Datos con Docker  
Ejecuta el siguiente comando para iniciar los servicios de Docker:  
```bash
docker compose up -d
```

### 4️⃣ Configurar Prisma y Crear Migración  
Configura el esquema de Prisma y realiza la primera migración:  
```bash
npx prisma migrate dev --name init
```

### 5️⃣ Inicializar el Proyecto  
Ejecuta el proyecto en modo desarrollo:  
```bash
npm run start:dev
```
