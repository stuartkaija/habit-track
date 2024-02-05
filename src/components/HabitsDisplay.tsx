import Habit from "./Habit"

export default function HabitsDisplay({ habits }: any) {
  return (
    <ol>
      {habits.map((habit: any) => {
        console.log(habit)
        return (
          <li key={habit.id}>
            <Habit
              id={habit.id}
              title={habit.title}
            />
          </li>
        )
      })}
    </ol>
  )
}
