const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const EmployeeModel = require('./EmployeeModel');

//connect database
const uri = "mongodb://localhost:27017/EmployeeDB"
mongoose.connect(uri)
    .then(() => console.log("Successfully connected to Employee database."))
    .catch((error) => console.error("Database connection error:", error));

router.post('/save-employee', async (req, res) => {
    try {
           const newEmployee = new EmployeeModel();
           newEmployee.EMPLOYEE_ID = req.body.EMPLOYEE_ID;
           newEmployee.FIRST_NAME = req.body.FIRST_NAME;
           newEmployee.LAST_NAME = req.body.LAST_NAME;
           newEmployee.EMAIL = req.body.EMAIL;
           newEmployee.PHONE_NUMBER = req.body.PHONE_NUMBER;
           newEmployee.HIRE_DATE = req.body.HIRE_DATE;
           newEmployee.JOB_ID = req.body.JOB_ID;
           newEmployee.SALARY = req.body.SALARY;
           newEmployee.COMMISSION_PCT = req.body.COMMISSION_PCT;
           newEmployee.MANAGER_ID = req.body.MANAGER_ID;
           newEmployee.DEPARTMENT_ID = req.body.DEPARTMENT_ID

           const data = await newEmployee.save();
           res.status(201).send("Employee Data inserted successfully");
        
    } catch (error) {
        console.error("Error saving employee:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.get('/findall', async (req, res) => {
    try {
        const allEmployees = await EmployeeModel.find({});
        res.status(200).json(allEmployees);
        
    } catch (error) {
        console.error("Error retrieving all employees:", error);
        res.status(500).send("Internal Server get Error");
    }
});
router.get('/findfirst', async (req, res) => {
    try {
        const firstEmployee = await EmployeeModel.findOne({});

        if (!firstEmployee) {
            return res.status(404).json({ message: "No employees found" });
        }0
        res.status(200).json(firstEmployee);
        
    } catch (error) {
        console.error("Error retrieving first employee:", error);
        res.status(500).send("Internal Server Error");
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
            const targetId = req.params.id;        
            const result = await EmployeeModel.deleteOne({ EMPLOYEE_ID: targetId });
        
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Employee not found to delete" });
            }
            res.status(200).json({ message: "Employee successfully deleted" });
        
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/delete-by-id', async (req, res) => {
    try {
        const targetId = req.body._id;
        if (!targetId) {
            return res.status(400).json({ message: "Missing required field: _id" });
        }
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(targetId);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found with that hex _id" });
        }
        res.status(200).json({ 
            message: "Employee successfully deleted", 
            deletedData: deletedEmployee 
        });
        
    } catch (error) {
        console.error("Error executing findByIdAndDelete:", error);        
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid MongoDB hex _id format" });
        }
        res.status(500).send("Internal Server Error");
    }
});
router.post('/delete', async (req, res) => {
    try {
        const employeeId = req.body.EMPLOYEE_ID;
        if (!employeeId) {
            return res.status(400).json({ message: "Missing required field: EMPLOYEE_ID" });
        }
        const deletedEmployee = await EmployeeModel.findOneAndDelete(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ 
            message: "Employee successfully deleted by the id", 
            deletedData: deletedEmployee 
        });
        
    } catch (error) {
        console.error("Error executing findOneAndDelete:", error);        
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid input" });
        }
        res.status(500).send("Internal Server Error");
    }
});
router.post('/update', async (req, res) => {
    try {
            const { _id, ...updateData } = req.body;
            if (!_id) {
                return res.status(400).json({ message: "Missing required field: _id" });
            }
            const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
                _id, 
                updateData, 
                { new: true, runValidators: true}
            );
            if (!updatedEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            res.status(200).json({
                message: "Employee successfully updated",
                data: updatedEmployee
            });
        
    } catch (error) {
        console.error("Error executing findByIdAndUpdate:", error);        
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid MongoDB hex _id format" });
        }
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;    