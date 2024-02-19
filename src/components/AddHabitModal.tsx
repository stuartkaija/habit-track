import { useState, MouseEventHandler, FormEvent } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAuth } from '../lib/AuthProvider';
import { supabase } from '../supabaseClient';
import HabitGenerator from '../classes/HabitGenerator';

const generator = new HabitGenerator;

export default function AddHabitModal({
  modalOpen,
  handleOpenModal,
  // handleAddNewHabit
}: {
  modalOpen: boolean
  handleOpenModal: any
  // handleAddNewHabit: MouseEventHandler
}) {
  const [newHabit, setNewHabit] = useState<string>('');
  const { user } = useAuth();

  const handleAddNewHabit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // generate habit data
    const newHabitData = generator.generateHabitData();
    const { error } = await supabase
      .from('habits')
      .insert({ user_id: user?.id, title: newHabit, completion_data: newHabitData });

    if (error) {
      console.warn(error)
      return;
    }
    console.log('successfully inserted new habit')
    setNewHabit('');
    handleOpenModal();
  }

  return (
    <Dialog
      open={modalOpen}
      onClose={handleOpenModal}
    >
      <DialogTitle>add habit</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill out the details of the habit you would like to add.</DialogContentText>
      </DialogContent>
      <form className='m-2' onSubmit={handleAddNewHabit}>
        <label htmlFor="">title</label>
        <input
          className='border-yellow-200 border-2 rounded-md p-2 px-6 mr-2'
          type="text"
          value={newHabit}
          placeholder='e.g. gym'
          onChange={(event) => setNewHabit(event.target.value)}
        />
        {/* <label htmlFor="">frequency</label> */}
        <DialogActions>
          <button className='m-2 px-4 w-full rounded bg-green-200 hover:bg-green-300' type='submit'>Add</button>
        </DialogActions>
      </form>
      <button className='m-2 px-4 rounded bg-slate-200 hover:bg-slate-300' onClick={handleOpenModal}>Cancel</button>
    </Dialog>
  )
}
