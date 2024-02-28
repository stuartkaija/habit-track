import { NavLink } from "react-router-dom";
import addHabitImg from '../assets/images/add-habit.png';
import addHabitModalImg from '../assets/images/add-habit-modal.png';
import habitCalendarImg from '../assets/images/habit-calendar.png';
import habitLegend from '../assets/images/habit-legend.png'
import habitComplete from '../assets/images/habits-complete.png'

export default function About() {
  return (
    <div className="p-4 space-y-4">
      <NavLink to='/'>Back</NavLink>
      <h2 className="mt-4 text-2xl lg:text-4xl font-bold text-blue-700">About</h2>
      <p className="">
        I built this application so as to create an easy visual tracking system for habit completion on a large time scale, i.e. one year. To see the sourcecode, checkout the <a className="underline" href="https://www.github.com/stuartkaija" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
      </p>
      <h3 className="text-xl lg:text-2xl font-semibold text-blue-700">How To Use</h3>
      <ol className="flex flex-col px-2 md:px-6 lg:px-12 space-y-6 list-decimal">
        <li>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-1/2 md:px-6">Start by clicking the <span className="font-semibold italic">Add Habit</span> button. </p>
            <img className="w-48 self-center md:ml-auto md:mr-auto" src={addHabitImg} alt="add habit button" />
          </div>
        </li>
        <li>
          <div className="flex flex-col items-center">
            <p className="md:px-6">This will open a modal in which you can input the details of the habit you want to track. The <span className="font-semibold italic">start</span> and <span className="font-semibold italic">end</span> dates will default to the start and end of the year. Complete the process by clicking the <span className="font-semibold italic">Add</span> button.</p>
            <img className="w-72 self-center" src={addHabitModalImg} alt="add habit modal" />
          </div>
        </li>
        <li>
          <div className="flex flex-col">
            <p className="md:px-6">This will generate an interactive calendar component in the main dashboard.</p>
            <img className="w-full md:w-2/3 lg:w-1/2 self-center" src={habitCalendarImg} alt="interactive habit calendar" />
          </div>
        </li>
        <li>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-1/2 lg:w-2/3 md:px-6">Each square within the calendar represents a day. Hovering over a square will indicate the date of that square in a tooltip. The square with an orange border indicates the day on which the habit was created. The square with a blue border indicates the current day.</p>
            <img className="w-48 ml-auto mr-auto" src={habitLegend} alt="calendar legend details" />
          </div>
        </li>
        <li>
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="md:w-1/2 lg:w-2/3 md:px-6">Clicking a square will change the habit completion status for that day to true, and will color the square <span className="text-green-500">green</span>. This indicates that you have completed the habit for that day. Clicking the square again will revert the habit completion status to false, indicating the habit has not been completed for that day.</p>
            <img className="w-48 ml-auto mr-auto" src={habitComplete} alt="calendar showing completed habits" />
          </div>
        </li>
      </ol>
      <NavLink to='/'>Back</NavLink>
    </div>
  )
}
