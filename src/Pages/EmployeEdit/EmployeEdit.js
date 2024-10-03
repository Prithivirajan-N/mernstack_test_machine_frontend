import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import './EmployeEdit.css';

function EmployeEdit() {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate(); // Create navigate function
  const [employe, setEmploye] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
  });

  useEffect(() => {
    const fetchEmployeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8005/employe/${id}`);
        setEmploye(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        toast.error('Failed to fetch employee details');
      }
    };

    fetchEmployeDetails();
  }, [id]);

  const onInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkbox (multiple selection)
    if (type === 'checkbox') {
      setEmploye((prevState) => {
        let updatedCourses = [...prevState.course];
        if (checked) {
          updatedCourses.push(value);
        } else {
          updatedCourses = updatedCourses.filter((course) => course !== value);
        }
        return {
          ...prevState,
          course: updatedCourses,
        };
      });
    } else {
      setEmploye({
        ...employe,
        [name]: value,
      });
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault(); 

    // Destructure the employe object
    const { name, email, mobile, designation, gender, course } = employe;

    // Validation checks
    if (!name.trim()) {
      toast.error('Full name is required');
      return;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!mobile.trim()) {
      toast.error('Mobile number is required');
      return;
    }

    // Check if mobile number is a valid format
    const mobilePattern = /^[0-9]{10}$/; // Assuming a 10-digit mobile number
    if (!mobilePattern.test(mobile)) {
      toast.error('Please enter a valid mobile number');
      return;
    }

    if (!designation) {
      toast.error('Designation is required');
      return;
    }

    if (!gender) {
      toast.error('Gender selection is required');
      return;
    }

    // Check if at least one course is selected
    if (course.length === 0) {
      toast.error('At least one course must be selected');
      return;
    }

    console.log('Form data:', employe);
  
    try {
      await axios.put(`http://localhost:8005/employe/${id}`, employe); 
      toast.success('Employee updated successfully!'); 
      
      // Navigate to the employee page
      navigate('/employes'); // Update this path based on your routing
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Failed to update employee');
    }
  };

  return (
    <Container className="mt-5 add-container">
      <h2 className='edit-h2'>Edit Employee</h2>
      <Form onSubmit={onFormSubmit}>
        <Row className="mb-3">
          <Col md={4} sm={12}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={employe.name}
                onChange={onInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={employe.email}
                onChange={onInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} sm={12}>
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                name="mobile"
                value={employe.mobile}
                onChange={onInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group controlId="formDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Select
                name="designation"
                value={employe.designation}
                onChange={onInputChange}
              >
                <option value="">Select designation</option>
                <option value="hr">HR</option>
                <option value="manager">Manager</option>
                <option value="sales">Sales</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4} sm={12}>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Male"
                  name="gender"
                  value="male"
                  checked={employe.gender === 'male'}
                  onChange={onInputChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  name="gender"
                  value="female"
                  checked={employe.gender === 'female'}
                  onChange={onInputChange}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={4} sm={12}>
            <Form.Group controlId="formCourse">
              <Form.Label>Course</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  label="MCA"
                  name="course"
                  value="mca"
                  checked={employe.course.includes('mca')}
                  onChange={onInputChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="BCA"
                  name="course"
                  value="bca"
                  checked={employe.course.includes('bca')}
                  onChange={onInputChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="BSc"
                  name="course"
                  value="bsc"
                  checked={employe.course.includes('bsc')}
                  onChange={onInputChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="add-button">
          Submit Form
        </Button>
      </Form>
      <ToastContainer position='top-center'/>
    </Container>
  );
}

export default EmployeEdit;
