const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registrar um novo usuário
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login de um usuário
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
