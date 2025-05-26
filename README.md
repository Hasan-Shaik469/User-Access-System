#  User Access Management System

A full-stack application built with **React**, **Node.js**, **TypeScript**, **Express**, and **TypeORM** to manage user access to software based on roles: `Admin`, `Manager`, and `Employee`.

##  Features
- Sign up & Login with JWT authentication
- Role-based routing:
  - **Admin**: Add software and assign access levels
  - **Employee**: Request software access
  - **Manager**: Approve or reject access requests
- Persistent sessions using localStorage
- PostgreSQL database with TypeORM

##  Project Structure
```bash
User-access-system/
├── frontend/
│ ├── src/
│ │ ├── pages/ 
│ │ └── App.jsx
│ └── package.json
├── backend/ 
│ ├── src/
│ │ ├── controllers/ 
│ │ ├── entities/
│ │ ├── middleware/
│ │ ├── routes/
│ │ ├── data-source.ts
│ │ └── index.ts
│ ├── .env
│ ├── tsconfig.json
│ └── package.json
```

---
##  Getting Started

###  Prerequisites
- Node.js
- PostgreSQL
- npm

## Backend Setup
```bash
cd backend
npm install
```

### Create .env in backend/:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_pg_user
DB_PASS=your_pg_password
DB_NAME=user_access_db
JWT_SECRET=your_secret_key
```
---
###  Create DB in PostgreSQL
```bash
CREATE DATABASE user_access_db;
```
---

### Run Backend
```bash
npx ts-node-dev src/index.ts
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Frontend runs at http://localhost:5173

## Test Flow
 1. Sign up as Admin → redirected to /create-software

 2. Add software with access levels (e.g., Read,Write,Admin)

 3. Sign up as Employee → go to /request-access

 4. Submit access request

 5. Sign up as Manager → go to /pending-requests to approve/reject


## Tech Stack
 - Frontend: React, Axios, React Router

 - Backend: Express, TypeScript, TypeORM

 - Auth: JWT, Bcrypt

 - Database: PostgreSQL

## Demo Image
   ![image](https://github.com/user-attachments/assets/48c620f4-1c76-4de3-9452-a9303557fa2d)

![image](https://github.com/user-attachments/assets/57a7929b-6580-4a5c-89e5-f133f1a33b75)

![image](https://github.com/user-attachments/assets/7333680e-caf8-4d7a-abe0-34fd795bd339)





