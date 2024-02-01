import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient";
import Nav from "./components/Nav";
import NewToDo from "./components/NewToDo"

export default function AuthenticatedApp() {
  const [toDos, setToDos] = useState<any[]>([]);

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

  const handleInserts = (payload: any) => {
    console.log('Change received!', payload);
    const event = payload.eventType;
    if (event === "INSERT") {
      const newToDo = payload.new;
      setToDos((prev) => {
        const newToDos = [...prev, newToDo];
        return newToDos;
      })
    }
    if (event === "DELETE") {
      const eventToDelete = payload.old;
      console.log(eventToDelete)
      setToDos((prev) => {
        const filtered = prev.filter((todo) => todo.id !== eventToDelete.id)
        return filtered;
      })
    }
    if (event === "UPSERT") {
      console.log('upserting buzzlebup')
    }
  }

  useEffect(() => {
    const todoListener = supabase
      .channel('todos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, handleInserts)
      .subscribe();

    return () => {
      todoListener.unsubscribe();
    }
  }, [])



  return (
    <div>
      <Nav />
      <NewToDo />
      <h3>To Dos</h3>
      {toDos && toDos.map((el, idx) => {
        return (
          <ToDo
            key={idx}
            todo={el}
          />
        )
      })}
    </div>
  )
}

const ToDo = ({ todo }) => {

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
      <input type="checkbox" checked={todo.is_complete} />
      <p className="px-2">{todo.title}</p>
      <button onClick={handleDelete} className="my-2 bg-red-400 rounded px-4">Delete</button>
    </div>
  )
}