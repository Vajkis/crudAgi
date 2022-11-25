import { useContext } from "react";
import { checkEmployee_action } from "../Action/dataActions";
import DataContext from "./DataContext";

function TableBody() {
  const { data, dispachData, setIsCheck } = useContext(DataContext);

  const check = (id, e) => {
    const c = e.target.checked;
    dispachData(checkEmployee_action(id, c));

    if (!c) {
      setIsCheck(c)
    }

  }

  return (
    <tbody className="tbody">
      {data?.map((e) => (
        <tr key={e.id}>
          <td><input type="checkbox" onChange={event => check(e.id, event)} checked={e.check}></input></td>
          <td>{e.name}</td>
          <td>{e.age}</td>
          <td>{e.city}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
