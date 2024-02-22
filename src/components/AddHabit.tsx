import React, { useState } from 'react';
import { useAuth } from '../lib/AuthProvider';
import { supabase } from '../supabaseClient';
import HabitGenerator from '../classes/HabitGenerator';
import AddHabitModal from './AddHabitModal';

const generator = new HabitGenerator();

export default function AddHabit() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newHabit, setNewHabit] = useState<string>('');
  const { user } = useAuth();

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

  const handleOpenModal = () => {
    setModalOpen(prev => !prev)
  }

  return (
    <div className='self-center'>
      <button onClick={handleOpenModal} className='p-2 m-2 w-48 lg:w-80 bg-emerald-200 hover:bg-emerald-400 rounded-md font-bold'>Add Habit</button>
      <AddHabitModal
        modalOpen={modalOpen}
        handleOpenModal={handleOpenModal}
      />
    </div>
  )
}
