import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import LargeButton from "../LargeButton/LargeButton";

const pink = "#E61F93";

const EditProfileModal = ({
  open,
  handleClose,
  user,
  handleSave,
}: {
  open: boolean;
  handleClose: () => void;
  user: any;
  handleSave: (updatedUser: any) => void;
}) => {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          padding: 4,
          maxWidth: "600px",
          width: "100%",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Editar Perfil
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Nombre"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: pink,
                borderRadius: 5,
              },
              "&:hover fieldset": {
                borderColor: pink,
              },
              "&.Mui-focused fieldset": {
                borderColor: pink,
              },
            },
          }}
        />
        <TextField
          margin="dense"
          name="city"
          label="Ciudad"
          fullWidth
          value={formData.city}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: pink,
                borderRadius: 5,
              },
              "&:hover fieldset": {
                borderColor: pink,
              },
              "&.Mui-focused fieldset": {
                borderColor: pink,
              },
            },
          }}
        />
        <TextField
          margin="dense"
          name="sex"
          label="Sexo"
          fullWidth
          value={formData.sex}
          onChange={handleChange}
          select
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: pink,
                borderRadius: 5,
              },
              "&:hover fieldset": {
                borderColor: pink,
              },
              "&.Mui-focused fieldset": {
                borderColor: pink,
              },
            },
          }}
        >
          <MenuItem value="Male">Masculino</MenuItem>
          <MenuItem value="Female">Femenino</MenuItem>
          <MenuItem value="Other">Otro</MenuItem>
        </TextField>
        <TextField
          margin="dense"
          name="age"
          label="Edad"
          fullWidth
          value={formData.age}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: pink,
                borderRadius: 5,
              },
              "&:hover fieldset": {
                borderColor: pink,
              },
              "&.Mui-focused fieldset": {
                borderColor: pink,
              },
            },
          }}
        />
        <TextField
          margin="dense"
          name="profession"
          label="Profesión"
          fullWidth
          value={formData.profession}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: pink,
                borderRadius: 5,
              },
              "&:hover fieldset": {
                borderColor: pink,
              },
              "&.Mui-focused fieldset": {
                borderColor: pink,
              },
            },
          }}
        />
        <TextField
          margin="dense"
          name="bodyType"
          label="Tipo de Cuerpo"
          fullWidth
          value={formData.bodyType}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: pink,
                borderRadius: 5,
              },
              "&:hover fieldset": {
                borderColor: pink,
              },
              "&.Mui-focused fieldset": {
                borderColor: pink,
              },
            },
          }}
        />
        <TextField
          margin="dense"
          name="size"
          label="Talla"
          fullWidth
          value={formData.size}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            marginBottom: 4,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: pink,
                borderRadius: 5,
              },
              "&:hover fieldset": {
                borderColor: pink,
              },
              "&.Mui-focused fieldset": {
                borderColor: pink,
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "end", padding: 2 }}>
        <Button
          onClick={handleClose}
          sx={{ textTransform: "none", color: pink, mr: 2}}
        >
          Cancelar
        </Button>
        <LargeButton
          text="Guardar"
          link=""
          onClick={() => handleSave(formData)}
          textColor="white"
          arrowColor="white"
          backgroundColor={pink}
        />
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
