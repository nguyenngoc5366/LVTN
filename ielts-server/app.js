const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const seedRoles = require('./src/seeders/role.seeder');

// Import routes
const userRoutes = require('./src/routes/user.routes');
const roleRoutes = require('./src/routes/role.routes');
const authRoutes = require('./src/routes/auth.routes');
const quizRoutes = require('./src/routes/quiz.routes');

// Import database models
const db = require('./src/models/db');
const { SELECT } = require('sequelize/lib/query-types');

// Khởi tạo ứng dụng Express
const app = express();

// Middleware cho CORS
app.use(cors());

// Middleware để xử lý body của request (application/json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

// Kết nối CSDL và đồng bộ các model
db.sequelize.sync().then(async () => {
  console.log('Database connected and models synced');
  await seedRoles(); // Seed roles when the database is ready
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Cổng server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
