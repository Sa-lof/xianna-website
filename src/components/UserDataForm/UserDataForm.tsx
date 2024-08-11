import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Button,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

const pink = "#E61F93";

interface UserDataFormProps {
  onSubmit: (data: any) => void;
}

const UserDataForm: React.FC<UserDataFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    profession: "",
    bodyType: "",
    size: "",
    country: "",
    sex: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    age: false,
    profession: false,
    bodyType: false,
    size: false,
    country: false,
    sex: false,
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("error");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const handleSubmit = () => {
    const newErrors = {
      name: !formData.name,
      age: !formData.age,
      profession: !formData.profession,
      bodyType: !formData.bodyType,
      size: !formData.size,
      country: !formData.country,
      sex: !formData.sex,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      setMessage("Todos los campos son obligatorios");
      setSeverity("error");
      setOpen(true);
    } else {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Información General
      </Typography>
      <TextField
        label="Nombre"
        name="name"
        fullWidth
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
        InputLabelProps={{ style: { color: pink } }}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          mb: 4,
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
        label="Edad"
        name="age"
        fullWidth
        value={formData.age}
        onChange={handleInputChange}
        error={errors.age}
        InputLabelProps={{ style: { color: pink } }}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          mb: 4,
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
        label="Profesión"
        name="profession"
        fullWidth
        value={formData.profession}
        onChange={handleInputChange}
        error={errors.profession}
        InputLabelProps={{ style: { color: pink } }}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          mb: 4,
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
        label="Tipo de Cuerpo"
        name="bodyType"
        fullWidth
        value={formData.bodyType}
        onChange={handleInputChange}
        error={errors.bodyType}
        InputLabelProps={{ style: { color: pink } }}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          mb: 4,
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
        label="Talla"
        name="size"
        fullWidth
        value={formData.size}
        onChange={handleInputChange}
        error={errors.size}
        InputLabelProps={{ style: { color: pink } }}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          mb: 4,
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
        label="País"
        name="country"
        fullWidth
        value={formData.country}
        onChange={handleInputChange}
        error={errors.country}
        InputLabelProps={{ style: { color: pink } }}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          mb: 4,
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
      <FormControl
        fullWidth
        error={errors.sex}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          mb: 4,
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
        <InputLabel sx={{ color: pink }}>Sexo</InputLabel>
        <Select
          name="sex"
          value={formData.sex}
          onChange={handleSelectChange}
          label="Sexo"
        >
          <MenuItem value="Male">Masculino</MenuItem>
          <MenuItem value="Female">Femenino</MenuItem>
          <MenuItem value="Other">Otro</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: pink,
            color: "white",
            borderRadius: 50,
            padding: "10px 20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: pink,
              transform: "scale(1.05)",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          Siguiente
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserDataForm;
