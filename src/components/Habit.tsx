import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Day from './Day';

export default function Habit({ id, title }) {
  const [completionData, setCompletionData] = useState<any>();

  // load completion data for this habit
  const loadCompletionData = async () => {
    const { data, error } = await supabase
      .from('completion_data')
      .select()
      .eq('id', id)

    if (error) {
      console.warn(error);
    } else {
      setCompletionData(data[0].completion_data);
    }
  }

  useEffect(() => {
    loadCompletionData();
  }, [])

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
  const handleUpdateCompletionData = async (updateDate: any, updatedStatus: boolean) => {
    setCompletionData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[updateDate] = updatedStatus;
      return updatedData;
    });
  }

  // send completion data updates to the server
  const updateCompletionData = async () => {
    if (completionData) {
      await supabase
      .from('completion_data')
      .upsert([{ id, completion_data: completionData }])
    }
  }
    
  useEffect(() => {
    updateCompletionData();
  }, [completionData])
  
  return (
    <div>
      <div className='flex'>
        <p className='m-2'>{title}</p>
        <button onClick={handleDeleteHabit} className='m-2 px-4 rounded bg-red-200 hover:bg-red-300'>Delete Habit</button>
      </div>
      <div className=''>
        {completionData && Object.entries(completionData).map(([date, completionValue]) => {
          return (
            <Day
              key={date}
              date={date}
              completionStatus={completionValue}
              onUpdate={handleUpdateCompletionData}
            />
          )
        })}
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