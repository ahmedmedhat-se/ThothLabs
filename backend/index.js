const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const adminRoutes = require('./routes/adminRoute');
const create_researchRoutes = require('./routes/create_researchRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/', adminRoutes);
app.use('/api/create-research', create_researchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});