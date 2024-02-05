import React, { useState } from 'react';
import { useSession } from '../lib/SessionProvider';
import { supabase } from '../supabaseClient';

export default function AddHabit() {
  const [newHabit, setNewHabit] = useState<string>('');
  const { user } = useSession();

  const handleAddHabit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { error } = await supabase
      .from('habits')
      .insert({ user_id: user?.id, title: newHabit });
    
    if (error) {
      console.warn(error)
    } else {
      console.log('successfully inserted new habit');
      setNewHabit('');
    }
  }

  return (
    <div>
      <h2>Add Habit</h2>
      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          placeholder='e.g. excercise'
          value={newHabit}
          onChange={(event) => setNewHabit(event.target.value)}
        />
        <button className='px-4 rounded bg-indigo-200 hover:bg-indigo-300'>Add Habit</button>
      </form>
    </div>
  )
}
