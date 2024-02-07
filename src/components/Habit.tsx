import { format, getDay, getDaysInYear, getYear, getISODay, getWeek, getISOWeek } from 'date-fns';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Day from './Day';

export default function Habit({ id, title, createdAt, completionData }: any) {
  const [copyCompletionData, setCopyCompletionData] = useState(completionData);

  console.log('copyCompletionData')
  console.log(copyCompletionData)


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
  const handleUpdateCompletionData = async (updateDate: any, day: number, week: number, updatedStatus: boolean) => {
    // use the week to find the correct week in which to update the data, should be able to use it as an index in the copy of completion data
    console.log('UPDATER FUNCTION FIRING')
    console.log(updateDate)
    console.log('week in which that date is found')
    console.log(week)
    console.log('day of week')
    console.log(day)
    console.log('update status')
    console.log(updatedStatus)
    
    
    setCopyCompletionData((prevData: any) => {
      const updatedData = [ ...prevData ];

      // bug in the last week of the year, where those habitDatums actually have a week of year value of 1
      updatedData[week - 1][day].habitComplete = updatedStatus;
      
      console.log(updatedData[week][day].habitComplete)
      return updatedData;
    });
  }

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
        <div className='w-1/12 grid grid-rows-7 justify-items-end pr-2'>
          <p className='row-start-2 text-xs'>Mon</p>
          <p className='row-start-4 text-xs'>Wed</p>
          <p className='row-start-6 text-xs'>Fri</p>
        </div>

        <div className='grid grid-cols-53 w-11/12'>
          {copyCompletionData.map((week: [], index: number) => {

            return (
              <div key={index} className='items-center grid grid-rows-7'>
                {week.map(({ date, habitComplete, dayOfWeek, weekOfMonth, weekOfYear, month }: any, cellIndex) => {
                  // console.log(date)
                  // console.log(dayOfWeek)
                  // console.log(weekOfMonth)
                  // console.log(weekOfYear)
                  // console.log(month)
                  return (
                    <Day
                      key={cellIndex}
                      date={date}
                      day={dayOfWeek}
                      week={weekOfYear}
                      completionStatus={habitComplete}
                      onUpdate={handleUpdateCompletionData}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}