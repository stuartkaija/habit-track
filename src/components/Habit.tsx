import { useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { supabase } from '../supabaseClient';
import { useAuth } from '../lib/AuthProvider';
import Day from './Day';

export default function Habit({ id, title, createdAt, completionData }: any) {
  const { user } = useAuth();

  const memoizedCompletionData = useMemo(() => {
    return completionData
  }, [completionData])

  // delete habit
  const handleDeleteHabit = async () => {
    const { data, error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id)

    if (error) {
      console.warn(error)
    }

    if (data) {
      console.log(data);
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
      .upsert({ id: id, user_id: user?.id, completion_data: updatedData })

    if (error) {
      console.warn(error);
    }
  }

  return (
    <div>
      <div className='flex'>
        <h2 className='text-lg md:text-2xl font-semibold m-2'>{title}</h2>
        <button onClick={handleDeleteHabit} className='m-2 px-4 rounded bg-red-200 hover:bg-red-300'>Delete Habit</button>
      </div>
      <div className='flex'>
        <div className='w-1/12 grid grid-rows-7 justify-items-end mr-2'>
          <p className='row-start-2 text-xs'>Mon</p>
          <p className='row-start-4 text-xs'>Wed</p>
          <p className='row-start-6 text-xs'>Fri</p>
        </div>

        <div className='overflow-x-auto'>
          <div className='grid grid-cols-53 gap-1 w-max'>
            {memoizedCompletionData.map((week: [], index: number) => {
              return (
                <div key={index} className='items-center grid grid-rows-7 gap-1'>
                  {week.map(({ date, habitComplete, dayOfWeek, weekOfYear }: any, cellIndex) => {
                    return (
                      <Day
                        key={cellIndex}
                        createdToday={isSameDay(createdAt, date)}
                        date={date}
                        day={dayOfWeek}
                        week={weekOfYear}
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
  )
}