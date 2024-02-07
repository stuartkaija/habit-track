import { format, getDay, getISODay, getWeek, getISOWeek } from 'date-fns';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Day from './Day';
import HabitGenerator from '../classes/HabitGenerator';

const generator = new HabitGenerator();

export default function Habit({ id, title, createdAt, completionData }) {
  console.log(completionData)

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
  // const handleUpdateCompletionData = async (updateDate: any, updatedStatus: boolean) => {
  //   setCompletionData((prevData) => {
  //     const updatedData = { ...prevData };
  //     updatedData[updateDate] = updatedStatus;
  //     return updatedData;
  //   });
  // }

  // update completion data table
  // const updateCompletionData = async () => {
  //   await supabase
  //     .from('completion_data')
  //     .upsert([{ id, completion_data: completionData }])
  // }
    
  // useEffect(() => {
  //   updateCompletionData();
  // }, [completionData])
  
  return (
    <div>
      <div className='flex'>
        <p className='m-2'>{title}</p>
        <button onClick={handleDeleteHabit} className='m-2 px-4 rounded bg-red-200 hover:bg-red-300'>Delete Habit</button>
      </div>
      <div className='flex'>
        <div className='grid grid-rows-7'>
          <p className='row-start-2'>Mon</p>
          <p className='row-start-4'>Wed</p>
          <p className='row-start-6'>Fri</p>
        </div>
        
        <div className='overflow-x-auto max-w-full'>
          <div className='grid grid-cols-53 gap-1 w-[100rem]'>
            {Array.from({length: 52}).map((_, weekIdx) => {
              console.log(weekIdx)
              return (
                <p>h</p>
              )
            })}

            {/* {completionData.map(({ date, dayOfWeek, weekOfYear, habitComplete }: any) => {
              console.log(date)
              console.log('dayOfWeek')
              console.log(dayOfWeek)
              console.log('weekOfYear')
              console.log(weekOfYear)
              // return (
              //   <div className={`col-start-${weekOfYear} row-start-${dayOfWeek === 0 ? 7: dayOfWeek}`}>
              //     <p className='border-black border text-xs'>
              //       {format(date, 'MMM dd')}
              //     </p>
              //     <Day
              //       key={date}
              //       date={date}
              //       completionStatus={habitComplete}
              //       onUpdate={null}
              //     />
              //   </div>
              // )
            })} */}

          </div>
        </div>
      </div>
    </div>
  )
}


  // const handleCompletionUpdates = (payload: any) => {
    
    // }

  // useEffect(() => {
  //   const completionDataListener = supabase
  //     .channel('completion_data')
  //     .on('postgres_changes', { event: '*', schema: 'public', table: 'completion_data' }, handleCompletionUpdates)
  //     .subscribe();

  //   return () => {
  //     completionDataListener.unsubscribe();
  //   }
  // }, [])