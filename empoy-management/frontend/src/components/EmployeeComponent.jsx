import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployee, createEmployee, updateEmployee } from '../service/EmployeeService';

function EmployeeComponent() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id]);


    const pageTitle = () => {
        if (id) {
            return "更新員工";
        } else {
            return "新增員工";
        }
    }

    const validateForm = () => {
        let errorsCopy = { ...errors };
        let valid = true;

        if (!firstName) {
            errorsCopy.firstName = '請輸入名字';
            valid = false;
        } else {
            errorsCopy.firstName = '';
        }
        if (!lastName) {
            errorsCopy.lastName = '請輸入姓氏';
            valid = false;
        } else {
             errorsCopy.lastName = '';
        }
        if (!email) {
             errorsCopy.email = '請輸入 Email';
             valid = false;
        }else {
            errorsCopy.email = '';
        }

        setErrors(errorsCopy);
        return valid;
    }


    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        
        if(validateForm()){
           const employee = {firstName, lastName, email};

            if (id) {
                updateEmployee(id,employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                     console.error(error);
                })
           }
        }
    }


    return (
        <div className="container">
            <br />
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">{pageTitle()}</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">名字 :</label>
                                <input
                                    type="text"
                                    placeholder="請輸入名字"
                                    name="firstName"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                 {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">姓氏 :</label>
                                <input
                                    type="text"
                                    placeholder="請輸入姓氏"
                                    name="lastName"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Email :</label>
                                <input
                                    type="text"
                                    placeholder="請輸入 Email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            <button className="btn btn-success" onClick={saveOrUpdateEmployee}>送出</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent