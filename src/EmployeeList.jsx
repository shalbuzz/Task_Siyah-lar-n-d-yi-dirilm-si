import { useEffect, useState } from "react"
import './styles.css';

const EmployeeList = ()=>{
 const [employees,setEmployees] = useState([])
 const [searchTerm,setSearchTerm] = useState('')
 const [selectDepartment, setSelectDepartment]= useState('all')
 const [filteredEmployees,setFilteredEmployees] = useState([])

 useEffect(()=>{
    fetch("https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood")
    .then(response=>response.json())
    .then((data)=>{
        setEmployees(data);
        setFilteredEmployees(data)
    }
)
 },[])

 useEffect(()=>{
    let filtered = employees;
    if(searchTerm.trim() !== ''){
        filtered= filtered.filter((employee)=>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }
    
    if(selectDepartment !== 'all'){
        filtered = filtered.filter((employee)=>
            employee.department === selectDepartment
        )
    }
    setFilteredEmployees(filtered)
 
 },[searchTerm,employees,selectDepartment])
return(
    <div className="container">
      <h1>İşçilər Siyahısı</h1>
      

      <input
        type="text"
        placeholder="İşçi adına görə axtarış..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <select
        value={selectDepartment}
        onChange={(e) => setSelectDepartment(e.target.value)}
        className="select-input"
      >
        <option value="all">Bütün şöbələr</option>
        <option value="Management">Management</option>
        <option value="Security">Security</option>
        <option value="Recruitment">Recruitment</option>
       
      </select>

      <ul className="employee-list">
        {filteredEmployees.map((employee) => (
          <li key={employee.id} className="employee-item">
            <h3>{employee.name}</h3>
            <p>Şöbə: {employee.department}</p>
            <p>Vəzifə: {employee.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );



}
export default EmployeeList