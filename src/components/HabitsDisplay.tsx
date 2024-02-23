import Habit from "./Habit"

export default function HabitsDisplay({ habits, setHabits }: any) {
  habits.sort((a, b) => a.id - b.id);
  
  return (
    <ol>
      {habits.map((habit: any) => {
        return (
          <li key={habit.id} className="">
            <Habit
              id={habit.id}
              title={habit.title}
              startDate={habit.start_date}
              endDate={habit.end_date}
              completionData={habit.completion_data}
              createdAt={habit.created_at}
              setHabits={setHabits}
            />
          </li>
        )
      })}
    </ol>
  )
}
