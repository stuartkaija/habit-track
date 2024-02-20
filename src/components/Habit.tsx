import { useState, useMemo } from 'react';
import { isSameDay, isWithinInterval } from 'date-fns';
import { supabase } from '../supabaseClient';
import { useAuth } from '../lib/AuthProvider';
import Day from './Day';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

export default function Habit({ id, title, startDate, endDate, createdAt, completionData }: any) {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
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

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(prev => !prev);
  }

  const handleOpenEditModal = () => {
    setEditModalOpen(prev => !prev);
  }

  return (
    <div className='flex flex-col lg:flex-row lg:justify-around m-2 rounded-lg border border-blue-200'>
      <div className='flex justify-between lg:flex-col lg:w-72 m-1 rounded-md border border-green-200 hover:border-green-400'>
        <h2 className='text-md sm:text-lg md:text-2xl font-semibold m-2'>{title}</h2>
        <div>
          <button onClick={handleOpenEditModal} className='m-2 px-4 max-w-32 rounded bg-purple-200 hover:bg-purple-300'>Edit</button>
          <EditModal
            name={title}
            startDate={startDate}
            endDate={endDate}
            modalOpen={editModalOpen}
            handleOpenModal={handleOpenEditModal}
            habitId={id}
            completionData={completionData}
          />
          <button onClick={handleOpenDeleteModal} className='m-2 px-4 max-w-32 rounded bg-red-200 hover:bg-red-300'>Delete</button>
          <DeleteModal
            modalOpen={deleteModalOpen}
            handleOpenModal={handleOpenDeleteModal}
            handleDeleteHabit={handleDeleteHabit}
          />
        </div>
      </div>

      {/* <div className='m-1 p-1 rounded-md border border-yellow-200 hover:border-yellow-400'>
        <h3>Stats</h3>
        <ul>
          <li>stat 1</li>
        </ul>
      </div> */}

      <div className='m-1 rounded-md p-2 flex border border-pink-300 hover:border-pink-500'>
        <div className='md:w-1/12 grid grid-rows-7 justify-items-end mr-2'>
          <p className='row-start-2 text-xs'>Mon</p>
          <p className='row-start-4 text-xs'>Wed</p>
          <p className='row-start-6 text-xs'>Fri</p>
        </div>

        <div className='overflow-x-auto'>
          <div className='grid grid-cols-53 gap-1 w-max'>
            {completionData && completionData.map((week: [], index: number) => {
              return (
                <div key={index} className='items-center grid grid-rows-7 gap-1'>
                  {week.map(({ date, habitComplete, dayOfWeek, weekOfYear }: any, cellIndex) => {
                    return (
                      <Day
                        key={cellIndex}
                        createdToday={isSameDay(createdAt, date)}
                        isWithinTimeframe={isWithinInterval(date, { start: startDate, end: endDate })}
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