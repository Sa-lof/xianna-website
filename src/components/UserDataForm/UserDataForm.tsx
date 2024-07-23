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

    if (!hasErrors) {
      onSubmit(formData);
    }
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
        helperText={errors.name ? "Este campo es obligatorio" : ""}
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
        helperText={errors.age ? "Este campo es obligatorio" : ""}
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
        helperText={errors.profession ? "Este campo es obligatorio" : ""}
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
        helperText={errors.bodyType ? "Este campo es obligatorio" : ""}
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
        helperText={errors.size ? "Este campo es obligatorio" : ""}
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
        helperText={errors.country ? "Este campo es obligatorio" : ""}
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
    </Box>
  );
};

export default UserDataForm;
