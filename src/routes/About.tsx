import { NavLink } from "react-router-dom"

export default function About() {
  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <NavLink to='/'>Back</NavLink>
        <h2 className="text-2xl">About</h2>
      </div>
      <div className="">
        <p className="p-4">
          I built this application so as to create an easy visual tracking system for habit completion on a large time scale, i.e. one year. Initially 
        </p>
      </div>
    </div>
  )
}
