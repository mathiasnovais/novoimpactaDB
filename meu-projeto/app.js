const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexão ao MongoDB (Substitua a URL pelo seu banco de dados)
mongoose.connect("mongodb+srv://impactadb:impactadb@cluster0.jhgsr.mongodb.net/nomedobanco", {
    // As opções antigas não são mais necessárias com versões recentes
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log("Error connecting to MongoDB", error);
});

// Rotas
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');

// Usar as rotas
app.use('/api/employees', employeeRoutes);
app.use('/api/users', userRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
