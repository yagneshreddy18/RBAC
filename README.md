Fine-Grained Role-Based Access Control (RBAC) using MERN Stack
🔒 Secure Access Management with Roles: Admin, Editor, Viewer

This project demonstrates a Role-Based Access Control (RBAC) system built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
It allows different types of users to access, create, and modify data based on their roles — ensuring a secure and scalable content management environment.

🚀 Features

✅ JWT Authentication – Secure login and token-based access
✅ Role Authorization – Role-specific access (Admin, Editor, Viewer)
✅ Fine-Grained Permissions – Editors can manage only their own posts
✅ Express Middleware Security – Validates tokens before every request
✅ Dynamic React Frontend – Role-based UI rendering and access control
✅ API Integration with MongoDB – Scalable NoSQL backend
✅ Clean Admin Dashboard – Manage users and posts easily

🧩 Project Structure
myproject/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── App.js
│   └── package.json
│
└── README.md

⚙️ Tech Stack
Component	Technology
Frontend	React.js
Backend	Node.js + Express.js
Database	MongoDB
Authentication	JWT (JSON Web Token)
Styling	CSS / Tailwind (optional)
Version Control	Git + GitHub


🧠 Roles and Permissions
Role	Permissions
Admin	Create, View, Update, Delete all posts
Editor	Create and manage only own posts
Viewer	View-only access (no edit/delete)

💻 Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/yourusername/myproject.git
cd myproject

2️⃣ Setup Backend
cd backend
npm install
node server.js


Server runs on http://localhost:4000

3️⃣ Setup Frontend
cd ../frontend
npm install
npm start


Frontend runs on http://localhost:3000

🔑 Default User Accounts
Role	Email	Password
Admin	admin@example.com
	admin123
Editor	editor@example.com
	editor123
Viewer	viewer@example.com
	viewer123
🧠 API Endpoints
Method	Endpoint	Description	Access
POST	/api/auth/login	User login	Public
POST	/api/auth/register	Register user	Admin
GET	/api/posts	Get all posts	Authenticated
POST	/api/posts	Create post	Admin, Editor
DELETE	/api/posts/:id	Delete post	Admin or Owner (Editor)

🧾 Future Enhancements

Full CRUD operations connected with MongoDB

Dynamic role creation and permission management

Password reset and email verification

Analytics and audit logging in the admin panel

Cloud deployment (Render, Vercel, or AWS)

👥 Developed By

Yagnesh Reddy (24BCG80001)

Shivank Yadav (23BCG10002)

Department of Computer Science and Engineering (Graphics & Gaming)
Academic Year: 2024–2025

📦 License

This project is created for educational purposes and can be freely modified and improved.