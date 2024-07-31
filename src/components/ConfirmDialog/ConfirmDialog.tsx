import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f8b7c7',
  color: 'white',
  borderRadius: '20px',
  textTransform: 'none',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#f499a8',
  },
}));

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Ya has calificado este blog
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ fontSize: '1.1rem' }}>
          ¿Quieres volverlo a calificar?
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <StyledButton onClick={onConfirm} variant="contained">
          Calificar
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
