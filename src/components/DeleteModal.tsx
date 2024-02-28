import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { MouseEventHandler } from 'react';

export default function DeleteModal({ 
  modalOpen,
  handleOpenModal,
  handleDeleteHabit
}: {
  modalOpen: boolean 
  handleOpenModal: MouseEventHandler
  handleDeleteHabit: MouseEventHandler
}) {
  return (
    <Dialog open={modalOpen} onClose={handleOpenModal}>
      <DialogTitle>Delete Habit</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this habit? All associated data will be deleted. This action can't be reversed.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <button className='m-2 px-3 py-1 rounded-sm w-2/3 border border-slate-800 hover:bg-red-500 hover:text-white transition-colors' onClick={handleDeleteHabit}>Delete</button>
        <button className='m-2 px-3 py-1 rounded-sm w-1/3 border border-slate-800 hover:bg-slate-400 hover:text-white transition-colors' onClick={handleOpenModal}>Cancel</button>
      </DialogActions>
    </Dialog>
  )
}
