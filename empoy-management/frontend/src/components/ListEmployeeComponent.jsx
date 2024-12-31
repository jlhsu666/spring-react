import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listEmployees, deleteEmployee } from '../service/EmployeeService';

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const addNewEmployee = () => {
        navigate('/add-employee');
    }

    const updateEmployee = (id) => {
        navigate(`/edit-employee/${id}`);
    }

    const removeEmployee =  (id) => {
        deleteEmployee(id).then((response) => {
                            console.log(response.data);
                            navigate('/employees');
                            getAllEmployees();
                        }).catch(error => {
                            console.error(error);
                        })
    }

    return (
        <div className="container">
            <h2 className="text-center">員工列表</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>新增員工</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>員工 ID</th>
                        <th>員工姓氏</th>
                        <th>員工名字</th>
                        <th>員工 Email</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>更新</button>
                                    <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)} style={{ marginLeft: '10px' }}>刪除</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent