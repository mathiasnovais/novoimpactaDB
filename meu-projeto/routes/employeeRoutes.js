const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Criar um novo funcionário
router.post('/', async (req, res) => {
    try {
        const { employeeName, salary, state, city } = req.body;
        const newEmployee = new Employee({ employeeName, salary, state, city });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todos os funcionários
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obter um funcionário pelo ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Funcionário não encontrado' });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um funcionário pelo ID
router.put('/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedEmployee) return res.status(404).json({ message: 'Funcionário não encontrado' });
        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar um funcionário pelo ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: 'Funcionário não encontrado' });
        res.status(200).json({ message: 'Funcionário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
