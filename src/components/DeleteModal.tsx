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
      <DialogTitle>delete habit</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this habit? All associated data will be deleted. This action can't be reversed.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <button className='m-2 px-4 max-w-32 rounded bg-red-200 hover:bg-red-300' onClick={handleDeleteHabit}>Delete</button>
        <button className='m-2 px-4 max-w-32 rounded bg-slate-200 hover:bg-slate-300' onClick={handleOpenModal}>Cancel</button>
      </DialogActions>
    </Dialog>
  )
}