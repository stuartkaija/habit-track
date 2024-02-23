import { useState } from 'react';
import AddHabitModal from './AddHabitModal';

export default function AddHabit({ disabled }: { disabled: boolean }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(prev => !prev)
  }

  return (
    <div className='self-center'>
      <div className='flex flex-col items-center content-center'>
        <button
          disabled={disabled}
          onClick={handleOpenModal}
          className={`p-2 m-2 w-48 lg:w-80 hover:lg:w-96 border rounded-sm  ${disabled ? 'bg-slate-200 border-slate-500 hover:lg:w-80 text-slate-500' : 'bg-green-500 border-slate-800 hover:text-white'} font-semibold transition-all`}
        >
          Add Habit
        </button>
        <AddHabitModal
          modalOpen={modalOpen}
          handleOpenModal={handleOpenModal}
        />
        {disabled && <p className='text-center text-sm w-4/5 text-slate-800'>While we're in beta, users can track a maximum of 5 habits. <br />If you'd like to see a higher number allowed, or have any other input, please reach out at <a className='italic underline' href="mailto:habittrack91@gmail.com">habittrack91@gmail.com</a></p>}
      </div>
    </div>
  )
}
