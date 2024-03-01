import { useState, useMemo } from 'react';
import { format, isFirstDayOfMonth, isSameDay, isWithinInterval } from 'date-fns';
import { Tables } from '../../types/supabase';
import { CompletionDatum } from '../interfaces/habits';
import { supabase } from '../supabaseClient';
import { useAlert } from '../lib/AlertContext';
import Day from './Day';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import HabitStats from './HabitStats';
import { calculateDaysComplete, calculateWeeklyAverage } from '../utils/habitStatHelpers';

type HabitType = Omit<Tables<'habits'>, 'user_id'>;
interface HabitProps extends HabitType { };

export default function Habit({
  id, name, start_date, end_date, created_at, completion_data
}:
  HabitProps
) {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const alert = useAlert();

  const memoizedCompletionData = useMemo(() => {
    return completion_data
  }, [completion_data])

  const daysComplete: number = useMemo(
    () => completion_data ? calculateDaysComplete(completion_data) : 0, [completion_data]
  );

  const weeklyAverage: number = useMemo(
    () => completion_data ? calculateWeeklyAverage(start_date, daysComplete) : 0, [start_date, daysComplete]
  );

  // delete habit
  const handleDeleteHabit = async () => {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id)

    if (error) {
      alert.error("Sorry, encountered issue trying to delete habit")
      console.warn(error)
    } else {
      alert.success("Habit deleted")
    }
  }

  // function to update completion data, passed to each Day component
  const handleUpdateHabit = async (day: number, week: number, updatedStatus: boolean) => {
    // use the week to find the correct week/index for which to update the data

    // make a copy of memoized data to update
    const updatedData = [...memoizedCompletionData];
    updatedData[week - 1][day].habitComplete = updatedStatus;

    const { error } = await supabase
      .from('habits')
      .update({ completion_data: updatedData })
      .eq('id', id)

    if (error) {
      alert.error(`Error: ${error.message}`)
    }
  }

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(prev => !prev);
  }

  const handleOpenEditModal = () => {
    setEditModalOpen(prev => !prev);
  }

  return (
    <div className='flex flex-col m-2 p-4 rounded-lg border border-slate-400 hover:border-slate-500'>
      <div className='flex-grow-1 flex justify-between items-center m-1 border-b border-indigo-200'>
        <h2 className='text-slate-800 text-md sm:text-lg md:text-2xl font-semibold m-2'>{name}</h2>
        <div className='w-1/2 sm:w-auto'>
          <button onClick={handleOpenEditModal} className='m-1 px-3 py-1 w-full sm:w-24 rounded-sm border border-slate-800 hover:bg-amber-500 hover:text-white transition-colors'>Edit</button>
          <EditModal
            name={name}
            startDate={start_date}
            endDate={end_date}
            modalOpen={editModalOpen}
            handleOpenModal={handleOpenEditModal}
            habitId={id}
            completionData={completion_data}
          />
          <button onClick={handleOpenDeleteModal} className='m-1 px-3 py-1 w-full sm:w-24 rounded-sm border border-slate-800 hover:bg-red-500 hover:text-white transition-colors '>Delete</button>
          <DeleteModal
            modalOpen={deleteModalOpen}
            handleOpenModal={handleOpenDeleteModal}
            handleDeleteHabit={handleDeleteHabit}
          />
        </div>
      </div>

      <div className='lg:flex'>
        <HabitStats
          daysComplete={daysComplete}
          weeklyAverage={weeklyAverage}
        />

        <div className='flex-grow justify-center m-1 rounded-md p-4 flex'>
          <div className=''>
            <div className='mr-2'>
              <div className='my-4 items-center grid grid-rows-7'>
                <p className='row-start-1 text-xs invisible'>Sun</p>
                <p className='row-start-2 text-xs'>Mon</p>
                <p className='row-start-3 text-xs invisible'>Tue</p>
                <p className='row-start-4 text-xs'>Wed</p>
                <p className='row-start-5 text-xs invisible'>Thu</p>
                <p className='row-start-6 text-xs'>Fri</p>
                <p className='row-start-7 text-xs invisible'>Sat</p>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <div className='grid grid-cols-53 gap-1 w-max pl-1'>
              {memoizedCompletionData && memoizedCompletionData.map((week: CompletionDatum[], index: number) => {
                // this allows us to find the first week of each month so as to place the month names correctly
                let isFirstWeek = false;
                const firstDayOfMonth = week.find(day => day.date && isFirstDayOfMonth(day.date));

                if (firstDayOfMonth && firstDayOfMonth.date) {
                  isFirstWeek = true;
                }

                return (
                  <div key={index} className='relative my-4 items-center grid grid-rows-7 gap-1'>
                    {isFirstWeek && firstDayOfMonth &&
                      <span className='absolute -top-4 z-40 text-xs '>{firstDayOfMonth.date && format(firstDayOfMonth.date, 'MMM')}</span>
                    }

                    {week.map(({ date, habitComplete, dayOfWeek, weekOfYear }: any, cellIndex) => {
                      return (
                        <Day
                          key={cellIndex}
                          date={date}
                          createdToday={isSameDay(created_at, date)}
                          isWithinTimeframe={isWithinInterval(date, { start: start_date, end: end_date })}
                          day={dayOfWeek}
                          weekOfYear={weekOfYear}
                          completionStatus={habitComplete}
                          handleUpdateHabit={handleUpdateHabit}
                        />
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}