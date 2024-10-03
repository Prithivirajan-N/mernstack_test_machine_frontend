// src/Employes.js
import axios from "axios";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header1 from "../../Component/Header1";
import './Employes.css';

function Employes() {
    const [employes, setEmployes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        loadEmployeDetails();
    }, []);

    const loadEmployeDetails = async () => {
        setLoading(true); // Set loading to true when starting the fetch
        try {
            const result = await axios.get('http://localhost:8005/employedetails');
            const reversedemployedata = result.data.reverse();
            setEmployes(reversedemployedata);
        } catch (err) {
            console.log('Error loading employee details:', err);
            toast.error('Error loading employee details');
        } finally {
            setLoading(false); // Set loading to false after fetch
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8005/deleteemploye/${id}`);
            loadEmployeDetails();
            toast.success('Employee Deleted Successfully');
        } catch (err) {
            console.log(err);
            toast.error('Error occurred while deleting employee');
        }
    };

    const filterEmployes = employes.filter((employe) =>
        employe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employe.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employe.mobile.includes(searchTerm)
    );

    return (
        <div>
            <Header1 searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {loading ? (
                <p>Loading...</p> // Show loading message
            ) : (
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Unique Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterEmployes.map((employe) => (
                            <tr key={employe._id}>
                                <td>{employe._id}</td>
                                <td>{employe.name}</td>
                                <td>{employe.email}</td>
                                <td>{employe.mobile}</td>
                                <td>{employe.designation}</td>
                                <td>{employe.gender}</td>
                                <td>{employe.course?.join(', ')}</td>
                                <td>{new Date(employe.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/editemploye/${employe._id}`}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(employe._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <ToastContainer position="top-center" />
            <Link to="/" className="btn btn-dark employe-backbtn">Back</Link>
        </div>
    );
}

export default Employes;
