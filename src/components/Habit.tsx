import { useState, useMemo } from 'react';
import { format, isFirstDayOfMonth, isSameDay, isWithinInterval, getMonth } from 'date-fns';
import { supabase } from '../supabaseClient';
import { useAuth } from '../lib/AuthProvider';
import { useAlert } from '../lib/AlertContext';
import Day from './Day';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

export default function Habit({ id, title, startDate, endDate, createdAt, completionData }: any) {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  
  const { user } = useAuth();
  const alert = useAlert();

  const memoizedCompletionData = useMemo(() => {
    return completionData
  }, [completionData])

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
      .upsert({ id: id, user_id: user?.id, completion_data: updatedData })

    if (error) {
      console.warn(error);
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
        <h2 className='text-slate-800 text-md sm:text-lg md:text-2xl font-semibold m-2'>{title}</h2>
        <div className=''>
          <button onClick={handleOpenEditModal} className='m-1 px-3 py-1 lg:w-24  rounded bg-yellow-200 hover:bg-yellow-300'>Edit</button>
          <EditModal
            name={title}
            startDate={startDate}
            endDate={endDate}
            modalOpen={editModalOpen}
            handleOpenModal={handleOpenEditModal}
            habitId={id}
            completionData={completionData}
          />
          <button onClick={handleOpenDeleteModal} className='m-1 px-3 py-1 w-24 rounded bg-red-300 hover:bg-red-400'>Delete</button>
          <DeleteModal
            modalOpen={deleteModalOpen}
            handleOpenModal={handleOpenDeleteModal}
            handleDeleteHabit={handleDeleteHabit}
          />
          <button onClick={() => alert.success("SUCCESS!")}>Display Alert</button>
        </div>
      </div>

      <div className='lg:flex'>


        <div className='flex-grow-1 m-1 p-1 border-b border-indigo-200 lg:border-0'>
          <h3>Stats</h3>
          <ul>
            <li>Days Completed: 24</li>
            <li>Frequency: 50%</li>
            <li>Weekly Average</li>
          </ul>
        </div>

        <div className='flex-grow justify-center m-1 rounded-md p-4 flex'>
          <div className='md:w-1/12 grid grid-rows-7 justify-items-end mr-2'>
            <p className='row-start-2 text-xs'>Mon</p>
            <p className='row-start-4 text-xs'>Wed</p>
            <p className='row-start-6 text-xs'>Fri</p>
          </div>

          <div className='overflow-x-auto'>
            <div className='grid grid-cols-53 gap-1 w-max'>
              {completionData && completionData.map((week: [], index: number) => {
                // this allows us to find the first week of each month so as to place the month names correctly
                let isFirstWeek = false;
                let month = null;
                const firstDayOfMonth = week.find(day => isFirstDayOfMonth(day.date));

                if (firstDayOfMonth) {
                  isFirstWeek = true;
                  month = getMonth(firstDayOfMonth.date)
                }

                return (
                  <div key={index} className='relative my-4 items-center grid grid-rows-7 gap-1'>
                    {isFirstWeek &&
                      <span className='absolute -top-4 z-40 text-xs '>{format(firstDayOfMonth?.date, 'MMM')}</span>
                    }
                    {week.map(({ date, habitComplete, dayOfWeek, weekOfYear }: any, cellIndex) => {
                      return (
                        <Day
                          key={cellIndex}
                          date={date}
                          createdToday={isSameDay(createdAt, date)}
                          isWithinTimeframe={isWithinInterval(date, { start: startDate, end: endDate })}
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