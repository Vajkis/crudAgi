import { useEffect } from "react";
import { useContext, useState } from "react";
import { cancelEdit_action, deleteEmployee_action, focusEmployee_action, saveEdit_action } from "../Action/dataActions";
import { checkEmployee_action, createPagesInList_action } from "../Action/pagesListActions";
import DataContext from "./DataContext";

function TableBody() {
  const { data, dispachData, setIsCheck, pagesList, page, dispachPagesList } = useContext(DataContext);

  useEffect(() => {
    console.log(pagesList[page - 1]);
  }, [pagesList, page])

  useEffect(() => {
    dispachPagesList(createPagesInList_action(data))
  }, [data, dispachPagesList]);

  const check = (id, e) => {
    const c = e.target.checked;
    dispachPagesList(checkEmployee_action(id, page, c));

    if (!c) {
      setIsCheck(c)
    }
  }

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');

  //edit imputu reiksmes
  useEffect(() => {
    if (data?.some(e => e.focus)) {
      const focusedEmployee = [...data].filter(e => e.focus)[0];
      setName(focusedEmployee.name);
      setAge(focusedEmployee.age);
      setCity(focusedEmployee.city);
    }
  }, [data])



  function focusEmployee(e) {
    return (
      <tr key={e.id}>
        <td><input type="checkbox" onChange={event => check(e.id, event)} checked={e.check}></input></td>
        <td><input type="text" value={name} onChange={event => setName(event.target.value)} /></td>
        <td><input type="number" value={age} onChange={event => setAge(event.target.value)} /></td>
        <td><select value={city} onChange={event => setCity(event.target.value)}>
          <option>Vilnius</option>
          <option>Kaunas</option>
          <option>Klaipėda</option>
        </select></td>
        <td>
          <button className="green" onClick={() => dispachData(saveEdit_action(e.id, { name, age, city }))}>Save</button>
          <button className="yellow" onClick={() => dispachData(cancelEdit_action())}>Cancel</button>
        </td>
      </tr>
    )
  }

  function blurEmployeeDefault(e) {
    return (
      <tr key={e.id}>
        <td><input type="checkbox" onChange={event => check(e.id, event)} checked={e.check}></input></td>
        <td>{e.name}</td>
        <td>{e.age}</td>
        <td>{e.city}</td>
        <td>
          <button className="green" onClick={() => dispachData(focusEmployee_action(e.id))}>Edit</button>
          <button className="yellow" onClick={() => dispachData(deleteEmployee_action(e.id))}>Delete</button>
        </td>
      </tr>
    )
  };

  return (
    <tbody className="tbody">
      {pagesList[page - 1]?.map(e => e.focus ? focusEmployee(e) : blurEmployeeDefault(e))}
    </tbody>
  );
}

export default TableBody;
