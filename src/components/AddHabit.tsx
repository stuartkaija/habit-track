import React, { useState } from 'react';
import { useSession } from '../lib/SessionProvider';
import { supabase } from '../supabaseClient';
import HabitGenerator from '../classes/HabitGenerator';

const generator = new HabitGenerator();

export default function AddHabit() {
  const [newHabit, setNewHabit] = useState<string>('');
  const { user } = useSession();

  const handleAddNewHabit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // generate habit data
    const newHabitData = generator.generateHabitData();
    const { error } = await supabase
      .from('habits')
      .insert({ user_id: user?.id, title: newHabit, completion_data: newHabitData});
    
    if (error) {
      console.warn(error)
      return;
    }
    console.log('successfully inserted new habit')
    setNewHabit('');
  }

  return (
    <div>
      <h2>Add Habit</h2>
      <form className='m-2' onSubmit={handleAddNewHabit}>
        <input 
          className='border-yellow-200 border-2 rounded-md p-2 px-6 mr-2' 
          type="text"
          value={newHabit}
          placeholder='e.g. gym'
          onChange={(event) => setNewHabit(event.target.value)}
        />
        <button className='p-2 px-6 bg-yellow-400 rounded-md'>generate habit</button>
      </form>
    </div>
  )
}
