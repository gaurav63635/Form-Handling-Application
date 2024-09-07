import { useState, useEffect } from "react";
import axios from "axios";

function RegForm() {
  const [employeeList, setEmployeeList] = useState([]);
  const [form, setForm] = useState({
    Name: "",
    Address: "",
    Country: "",
    State: "",
    Qualification: "",
    Religion: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.Name ||
      !form.Address ||
      !form.State ||
      !form.Country ||
      !form.Qualification ||
      !form.Religion
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      let response;
      if (editingId) {
        // Update existing employee
        response = await axios.patch(
          `http://localhost:8000/newEmployee/${editingId}`,  // Corrected line with backticks
          form
        );
      } else {
        // Add new employee
        response = await axios.post("http://localhost:8000/newEmployee", form);
      }

      if (response) {
        window.alert(
          editingId
            ? "Data updated successfully"
            : "Data submitted successfully"
        );
        getData(); // Fetch the updated list
      }
    } catch (error) {
      window.alert("Error occurred");  // Fixed typo from "Error occurre" to "Error occurred"
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      address: "",
      country: "",
      state: "",
      qualification: "",
      religion: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const getById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/newEmployee/${id}`  // Corrected line with backticks
      );
      if (response.data) {
        setForm(response.data);
        setIsEditing(true);
        setEditingId(id);
      } else {
        alert("Failed to fetch employee data");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/newEmployee");
      if (response.data) {
        setEmployeeList(response.data);
      }
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/newEmployee/${id}`  // Corrected line with backticks
      );
      alert("Employee deleted successfully");
      getData();
    } catch (error) {
      alert("Failed to delete employee");
    }
  };
  

  useEffect(() => {
    getData();
  
}, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-4">
          <h2>Employee Registration</h2>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="Name"
                className="form-control"
                value={form.Name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="Address"
                className="form-control"
                value={form.Address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="State"
                className="form-control"
                value={form.State}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="Country"
                className="form-control"
                value={form.Country}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Qualification</label>
              <select
                name="Qualification"
                className="form-control"
                value={form.Qualification}
                onChange={handleChange}
              >
                <option value="">Select Qualification</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="B.Tech">B.Tech</option>
              </select>
            </div>
            <div className="form-group">
              <label>Religion</label>
              <select
                name="Religion"
                className="form-control"
                value={form.Religion}
                onChange={handleChange}
              >
                <option value="">Select Religion</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Sikh">Sikh</option>
                <option value="Christian">Christian</option>
              </select>
            </div>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-3 ">
                Add Employee
              </button>
            </form>
          </div>

        <div className="col-8">
          <h2>Employee List</h2>
          <table className="table mt-5 table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Country</th>
                <th>State</th>
                <th>Qualification</th>
                <th>Religion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.Name}</td>
                  <td>{employee.Address}</td>
                  <td>{employee.Country}</td>
                  <td>{employee.State}</td>
                  <td>{employee.Qualification}</td>
                  <td>{employee.Religion}</td>
                  <td>
                  <button className="btn btn-warning ">Edit</button>
                      <button className="btn btn-primary ">View</button>
                      <button onClick={()=>deleteData(employee._id)} className="btn btn-danger ">Delete</button>
                    </td>
                  </tr>   
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>





  );
}
export default RegForm;
