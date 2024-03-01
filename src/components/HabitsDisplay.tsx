import { Tables } from "../../types/supabase";
import Habit from "./Habit";

export default function HabitsDisplay({
  habits,
}: {
  habits: Tables<'habits'>[],
}) {
  habits.sort((a, b) => {
    return a.id - b.id
  });
  
  return (
    <ol>
      {habits.map((habit: Tables<'habits'>) => {
        return (
          <li key={habit.id}>
            <Habit
              id={habit.id}
              name={habit.name}
              start_date={habit.start_date}
              end_date={habit.end_date}
              completion_data={habit.completion_data}
              created_at={habit.created_at}
            />
          </li>
        )
      })}
    </ol>
  )
}
