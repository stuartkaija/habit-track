import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient";
import { useAuth } from "./lib/AuthProvider";
import { useAlert } from "./lib/AlertContext";
import upArrow from './assets/icons8-arrow-50.png'
import Nav from "./components/Nav";
import AddHabit from "./components/AddHabit";
import HabitsDisplay from "./components/HabitsDisplay";

export default function AuthenticatedApp() {
  const [habits, setHabits] = useState<any[]>([]);

  const { user } = useAuth();
  const alert = useAlert();

  const loadHabits = async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('id, title, created_at, completion_data, start_date, end_date')
      .eq('user_id', user.id)
    if (error) {
      alert.error(`Error: ${error.message}`)
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
    const event = payload.eventType;
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
      const habitToUpdate = payload.old;
      const updatedHabit = payload.new;
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
      <div className="flex flex-col p-2">
        <HabitsDisplay
          habits={habits}
          setHabits={setHabits}
        />
        <AddHabit
          disabled={habits.length >= 5}
        />
        {!habits.length &&
          <div className="self-center flex flex-col items-center mt-2">
            <img className="w-6 animate-wiggle" src={upArrow} alt="arrow icon" />
            <p className="m-4 font-bold">start here!</p>
          </div>
        }
      </div>
    </div>
  )
}