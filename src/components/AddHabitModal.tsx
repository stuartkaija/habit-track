import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { isBefore, startOfYear, endOfYear, startOfDay } from 'date-fns';
import { useAuth } from '../lib/AuthProvider';
import { useAlert } from '../lib/AlertContext';
import { supabase } from '../supabaseClient';
import HabitGenerator from '../classes/HabitGenerator';

const generator = new HabitGenerator;

export default function AddHabitModal({
  modalOpen,
  handleOpenModal,
}: {
  modalOpen: boolean
  handleOpenModal: any
}) {
  const firstDayOfYear = startOfYear(new Date());
  const today = startOfDay(new Date());
  const lastDayOfYear = endOfYear(new Date());

  const [habitName, setHabitName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(lastDayOfYear);
  const [nameError, setNameError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);

  const auth = useAuth();
  const alert = useAlert();

  const resetAllState = () => {
    setHabitName('');
    setStartDate(today);
    setEndDate(lastDayOfYear);
    setNameError(false);
    setDateError(false);
  }

  const handleAddNewHabit = async (event: React.SyntheticEvent) => {
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

    // generate habit data
    const newHabitData = generator.generateHabitData();

    const { error } = await supabase
      .from('habits')
      .insert({
        user_id: auth?.user.id,
        name: habitName,
        start_date: startDate,
        end_date: endDate,
        completion_data: newHabitData
      })

    if (error) {
      alert.error(`Sorry, unable to add habit: ${error.message}`)
    } else {
      alert.success('Successfully added habit')
    }

    resetAllState();
    handleOpenModal();
  }

  return (
    <Dialog
      open={modalOpen}
      onClose={() => {
        resetAllState();
        handleOpenModal();
      }}
    >
      <DialogTitle>Add Habit</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill out the details for the habit you would like to track.</DialogContentText>
      </DialogContent>
      <form className='flex flex-col justify-around m-2 h-80' onSubmit={handleAddNewHabit}>
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
          value={startDate}
          minDate={firstDayOfYear}
          maxDate={lastDayOfYear}
          onChange={(value) => {
            setDateError(false);
            setStartDate(value!);
          }}
        />
        <DatePicker
          label='End Date'
          value={endDate}
          minDate={firstDayOfYear}
          maxDate={lastDayOfYear}
          onChange={(value) => {
            setDateError(false);
            setEndDate(value!);
          }}
        />
        <p className={`${dateError ? 'visible' : 'invisible'} text-xs text-red-500`}>End Date must be after Start Date</p>
        <DialogActions>
          <button
            className='m-2 p-2 w-2/3 rounded-sm border border-slate-800 hover:bg-green-500 hover:text-white transition-colors'
            type='submit'
          >Add</button>
          <button
            className='m-2 p-2 w-1/3 rounded-sm border border-slate-800 hover:bg-slate-400 hover:text-white transition-colors'
            type='reset'
            onClick={() => {
              resetAllState();
              handleOpenModal();
            }}
          >Cancel</button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

