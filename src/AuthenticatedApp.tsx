import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient";
import NewToDo from "./components/NewToDo"

export default function AuthenticatedApp() {
  const [toDos, setToDos] = useState([]);

  const loadData = async () => {
    const { data, error } = await supabase.from('todos').select();
    if (error) {
      console.warn(error)
    } else {
      setToDos(data);
    }
  }

  useEffect(() => {
    loadData();
  }, [])


  return (
    <div>
      <h2>Ya'll are signed in!</h2>
      <NewToDo />
      <h3>To Dos</h3>
      {toDos && toDos.map((el) => {
        return (
          <ToDo
            todo={el}
          />
        )
      })}
    </div>
  )
}

const ToDo = ({ todo }) => {
  console.log(todo)

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id)

    if (error) {
      console.warn(error)
    }

    if (data) {
      console.log(data);
    }
  }

  return (
    <div className="flex">
      <input type="checkbox" checked={todo.is_complete}/>
      <p className="px-2">{todo.task}</p>
      <button onClick={handleDelete} className="my-2 bg-red-400 rounded px-4">Delete</button>
    </div>
  )
}