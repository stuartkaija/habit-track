import { useState } from "react"
import { supabase } from "../supabaseClient";

export default function NewToDo() {
  const [newToDo, setNewToDo] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const user = await supabase.auth.getUser();
    console.log('user');
    console.log(user.data.user.id);

    const session = await supabase.auth.getSession();

    console.log('session')
    console.log(session)

    const { error } = await supabase
      .from('todos')
      .insert({ user_id: user.data.user.id, title: newToDo });

    if (error) {
      console.warn(error)
    } else {
      console.log('succesffully inserted a new to do...');
      setNewToDo('');
    }
  }

  return (
    <div>
      <h2>Add a To Do</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <input
          type="text"
          placeholder="Drink more coffee..."
          value={newToDo}
          onChange={(e) => setNewToDo(e.target.value)}
        />
        <button className="bg-purple-300 px-4 rounded">Add to do</button>
      </form>
    </div>
  )
}
