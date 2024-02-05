import { useState, useEffect } from 'react';
import { useSession } from '../lib/SessionProvider';
import { supabase } from '../supabaseClient';

export default function Habit({ id, title }) {
  const [completionData, setCompletionData] = useState<any>();
  console.log(completionData)

  // TODO api call to get completion data
  const loadCompletionData = async () => {
    const { data, error } = await supabase
      .from('completion_data')
      .select()
      .eq('id', id)
    
    if (error) {
      console.warn(error);
    } else {
      setCompletionData(data);
    }
  }

  useEffect(() => {
    loadCompletionData();
  }, [])

  // TODO api call to delete a habit
  const handleDelete = async () => {
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

  return (
    <div>
      <div className='flex'>
        <p className='m-2'>{title}</p>
        <button onClick={handleDelete} className='m-2 px-4 rounded bg-red-200 hover:bg-red-300'>Delete Habit</button>
      </div>
      <div>
        big grid of clickable days...
      </div>
    </div>
  )
}
