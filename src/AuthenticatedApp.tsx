import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient";
import { useAuth } from "./lib/AuthProvider";
import Nav from "./components/Nav";
import AddHabit from "./components/AddHabit";
import HabitsDisplay from "./components/HabitsDisplay";

export default function AuthenticatedApp() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<any[]>([]);

  const loadHabits = async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('id, title, created_at, completion_data, start_date, end_date')
      .eq('user_id', user.id)
    if (error) {
      console.warn(error);
    } else {
      setHabits(data);
    }
  }

  useEffect(() => {
    loadHabits();
  }, [])

  // function to handle real time updates
  const handleHabitUpdates = (payload: any) => {
    console.log('handling habit updates...')
    const event = payload.eventType;
    console.log(event)
    if (event === "INSERT") {
      const newHabit = payload.new;
      setHabits((prev) => {
        const newHabits = [...prev, newHabit];
        return newHabits;
      })
    }
    if (event === "DELETE") {
      const habitToDelete = payload.old;
      setHabits((prev) => {
        const filtered = prev.filter((habit) => habit.id !== habitToDelete.id)
        return filtered;
      })
    }
    if (event === "UPDATE") {
      console.log('UPDATING...')
      const habitToUpdate = payload.old;
      console.log(habitToUpdate)
      const updatedHabit = payload.new;
      console.log(updatedHabit)
      setHabits((prev) => {
        return prev.map(habit => (habit.id === habitToUpdate.id ? updatedHabit : habit));
      })
    }
  }

  useEffect(() => {
    const habitsListener = supabase
      .channel('habits')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'habits' }, handleHabitUpdates)
      .subscribe();

    return () => {
      habitsListener.unsubscribe();
    }
  }, [])

  return (
    <div>
      <Nav />
      <div className="p-2">
        <HabitsDisplay
          habits={habits}
          setHabits={setHabits}
        />
        <AddHabit />
      </div>
    </div>
  )
}