import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { isBefore, startOfYear, endOfYear } from 'date-fns';
import { useAuth } from '../lib/AuthProvider';
import { useAlert } from '../lib/AlertContext';
import { supabase } from '../supabaseClient';
import HabitGenerator from '../classes/HabitGenerator';

const generator = new HabitGenerator;

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AddHabitModal({
  modalOpen,
  handleOpenModal,
}: {
  modalOpen: boolean
  handleOpenModal: any
}) {
  const firstDayOfYear = startOfYear(new Date());
  const lastDayOfYear = endOfYear(new Date());

  const [habitName, setHabitName] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState([false, false, false, false, false, false, false])
  const [startDate, setStartDate] = useState<Date>(firstDayOfYear);
  const [endDate, setEndDate] = useState<Date>(lastDayOfYear);
  const [nameError, setNameError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [selectedDaysError, setSelectedDaysError] = useState<boolean>(false);

  const auth = useAuth();
  const alert = useAlert();

  const resetAllState = () => {
    setHabitName('');
    setStartDate(firstDayOfYear);
    setEndDate(lastDayOfYear);
    setNameError(false);
    setDateError(false);
    setSelectedDaysError(false);
  }

  const handleSelectDays = (position: number) => {
    const updatedDays = selectedDays.map((day, index) => index === position ? !day : day)
    setSelectedDays(updatedDays);
  }

  const handleSelectAllDays = () => {
    if (selectedDays.every(day => day === true)) {
      const updatedDays = selectedDays.map(() => false);
      setSelectedDays(updatedDays);
    } else {
      const updatedDays = selectedDays.map(() => true);
      setSelectedDays(updatedDays);
    }
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

    if (selectedDays.every(day => !day)) {
      setSelectedDaysError(true);
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
        completion_data: newHabitData,
        days: selectedDays
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
    // PaperProps={{
    //   sx: {
    //     height: '100vh'
    //   }
    // }}
    >
      <DialogTitle>Add Habit</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill out the details for the habit you would like to track.</DialogContentText>
        <form className='flex flex-col m-2 space-y-4' onSubmit={handleAddNewHabit}>
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
          <fieldset className={`border p-3 rounded-md ${selectedDaysError ? 'border-red-600' : 'border-slate-200'}`}>
            <legend className={`text-xs ${selectedDaysError ? 'text-red-600' : 'text-gray-500 '}`}>Select Days To Complete Habit</legend>
            <FormGroup>
              <FormControlLabel
                label='Select All'
                control={
                  <Checkbox
                    checked={selectedDays.every(day => day === true)}
                    indeterminate={selectedDays.some(day => day === true)}
                    onChange={() => handleSelectAllDays()}
                  />
                }
              />
              {days.map((day, index) => {
                return (
                  <FormControlLabel
                    sx={{
                      ml: 0.1
                    }}
                    label={day}
                    value={index}
                    control={
                      <Checkbox
                        checked={selectedDays[index]}
                        onChange={() => handleSelectDays(index)}
                      />
                    }
                  />
                )
              })}
              {/* <FormControlLabel control={<Checkbox />} label='Sunday' value={0} />
              <FormControlLabel control={<Checkbox />} label='Monday' value={1} />
              <FormControlLabel control={<Checkbox />} label='Tuesday' value={2} />
              <FormControlLabel control={<Checkbox />} label='Wednesday' value={3} />
              <FormControlLabel control={<Checkbox />} label='Thursday' value={4} />
              <FormControlLabel control={<Checkbox />} label='Friday' value={5} />
              <FormControlLabel control={<Checkbox />} label='Saturday' value={6} /> */}
            </FormGroup>
          </fieldset>
          <p className={`${selectedDaysError ? 'visible' : 'invisible'} text-xs mt-0 text-red-500`}>You must select at least one day on which to complete habit.</p>
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
        </form>
      </DialogContent>
      <DialogActions>
        <button className='m-2 p-2 w-2/3 rounded-sm border border-slate-800 hover:bg-green-500 hover:text-white transition-colors' type='submit' onClick={handleAddNewHabit}>Add</button>
        <button className='m-2 p-2 w-1/3 rounded-sm border border-slate-800 hover:bg-slate-400 hover:text-white transition-colors' type='reset' onClick={handleOpenModal}>Cancel</button>
      </DialogActions>

    </Dialog>
  )
}

