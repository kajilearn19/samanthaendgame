import axios from "axios";

// Base URL of your Node.js backend
const BASE_URL = "http://localhost:5000/employee-api";

// Get all employees
export const getAllEmployees = async () => {
    return await axios.get(`${BASE_URL}/findall`);
};

// Add a new employee
export const addEmployee = async (employee) => {
    return await axios.post(`${BASE_URL}/save-employee`, employee);
};

// Update an employee
export const updateEmployee = async (employee) => {
    return await axios.post(`${BASE_URL}/update`, employee);
};

// Delete an employee
export const deleteEmployeeByID = async (id) => {
    return await axios.post(`${BASE_URL}/delete-by-id`, {
        _id: id
    });
};
// Delete an employee
export const deleteEmployee = async (id) => {
    return await axios.post(`${BASE_URL}/delete`, {
        EMPLOYEE_ID: id
    });
};