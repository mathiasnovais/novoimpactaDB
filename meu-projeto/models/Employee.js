const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
        unique: true,
    },
    salary: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

