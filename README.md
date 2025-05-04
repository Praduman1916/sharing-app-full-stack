```markdown
#  Full Stack Link Sharing App

A complete **Link Sharing App** with frontend + backend.  
Users can register, login, add their social/profile links, and preview them live.

---

##  Tech Stack

### Frontend
- **Next.js (App Router)**
- **Tailwind CSS**
- **@dnd-kit** for drag and drop
- **React Toastify** for notifications

### Backend
- **Node.js + Express**
- **MySQL** (via Sequelize)
- **JWT Auth with Cookies**
- **Sequelize CLI** for migrations

---

##  Features

- User registration & login with role selection
- JWT-based secure authentication
- Add, delete & reorder links
- Platform validation (GitHub, LinkedIn, etc.)
<!-- - Live mobile preview -->
- Logout and session clear
- Middleware for verifying JWT tokens

---

##  Project Structure

```

src/
├── app/               # Next.js pages: /login, /register, /home, /preview
├── api/               # Frontend API calls to backend
├── components/ui/     # Reusable UI components
├── lib/               # Platform options & helpers
├── backend/src/       # Express backend
│   ├── config/        # Sequelize DB config
│   ├── controllers/   # Auth and Link logic
│   ├── middleware/    # JWT verification middleware
│   ├── migrations/    # Sequelize migrations
│   ├── models/        # User and Link models
│   ├── routes/        # Express routes
│   ├── services/      # Service logic
│   ├── app.js         # Express app instance
│   └── server.js      # Starts the backend server

````

---

##  Getting Started

### 1. Clone the project

```bash
git clone https://github.com/Praduman1916/sharing-app-full-stack.git
cd sharing-app-full-stack
````

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup `.env` file

Create a `.env` file in the root and add:

```env
***dummy .env**

DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=Admin@12345
DB_NAME=sharing_app
DB_PORT=3306
PORT=9000
JWT_SECRET=huhu878748uid98287678989huhfe
NEXT_PUBLIC_API_URL=http://localhost:9000/api/v1

```

---

### 4. Setup database (MySQL + Sequelize)

Make sure MySQL is running and create a database manually.

Then run:

```bash
npx sequelize-cli db:migrate
```

It will create all required tables.

---

### 5. Run the app

```bash
npm run dev
```

✅ This will start **both frontend and backend** using `concurrently`.
Frontend: [http://localhost:3000](http://localhost:3000)
Backend: [http://localhost:9000](http://localhost:9000)

---

## Auth Middleware

* JWT token is saved in cookies after login
* Middleware checks token in protected routes
* Token is required for:

  * Adding links
  * deleting links
  * Getting profile info

---

##  API Endpoints (Sample)

* `POST /api/v1/auth/register` → Register user
* `POST /api/v1/auth/login` → Login user
* `GET /api/v1/link/` → Get All link
* `POST /api/v1/link` → Add link
* `DELETE /api/links/:id` → Delete link

---

##  Notes

* All platform links are validated (e.g., GitHub must start with `https://github.com/`)
* Live preview updates as you edit links
* Fully responsive and mobile friendly
* Built with clean code and reusable components

---