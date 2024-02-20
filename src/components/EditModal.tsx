import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { isBefore } from 'date-fns';
import { supabase } from '../supabaseClient';

export default function EditModal({
  name,
  startDate,
  endDate,
  modalOpen,
  handleOpenModal,
  habitId,
  completionData,
}: {
  name: string
  startDate: string
  endDate: string
  modalOpen: boolean
  handleOpenModal: any
  habitId: number,
  completionData: any
}) {
  const [habitName, setHabitName] = useState<string>(name);
  const [newStartDate, setNewStartDate] = useState<string | null>(startDate);
  const [newEndDate, setNewEndDate] = useState<string | null>(endDate);
  const [nameError, setNameError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  const handleEditHabit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // error handling
    if (!habitName.length || habitName.length > 100) {
      setNameError(true);
      return;
    }

    if (isBefore(endDate, startDate)) {
      setDateError(true);
      return;
    }

    const { error } = await supabase
      .from('habits')
      .update({
        title: habitName,
        start_date: newStartDate,
        end_date: newEndDate,
        completion_data: completionData
      })
      .eq('id', habitId);

    if (error) {
      console.log(error);
    } else {
      console.log('successfully edited habit')
    }

    handleOpenModal();
  }

  return (
    <Dialog
      open={modalOpen}
      onClose={handleOpenModal}
    >
      <DialogTitle>Edit Habit</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit the details of the habit you're tracking below.</DialogContentText>
      </DialogContent>
      <form className='flex flex-col justify-around m-2 h-80' action="" onSubmit={handleEditHabit}>
        <TextField
          type='text'
          id='name'
          label='Habit Name'
          value={habitName}
          onChange={(event) => {
            setNameError(false);
            setHabitName(event.target.value)
          }
          }
          error={nameError}
          helperText='name of habit - 100 characters or less'
        />
        <DatePicker
          label='Start Date'
          value={newStartDate}
          minDate='January 1, 2024'
          maxDate='December 31, 2024'
          onChange={(value) => {
            setDateError(false);
            setNewStartDate(value)
          }}
        />
        <DatePicker
          label='End Date'
          value={newEndDate}
          minDate='January 1, 2024'
          maxDate='December 31, 2024'
          onChange={(value) => {
            setDateError(false);
            setNewEndDate(value)
          }}
        />
        <p className={`${dateError ? 'visible' : 'invisible'} text-xs text-red-500`}>End Date must be after Start Date</p>
      </form>
      <DialogActions>
        <button className='m-2 p-2 w-2/3 rounded bg-yellow-200 hover:bg-yellow-300' onClick={handleEditHabit}>Edit</button>
        <button className='m-2 p-2 w-1/3 rounded bg-slate-200 hover:bg-slate-300' onClick={handleOpenModal}>Cancel</button>
      </DialogActions>
    </Dialog>
  )
}