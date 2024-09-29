import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Select,
  Typography,
  Box,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Card,
} from "@mui/material";

interface QuestionProps {
  color: string;
  question: string;
  questionNumber: number;
  responses: string[];
  selectedResponse: string;
  onResponseChange: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  color,
  question,
  questionNumber,
  responses,
  selectedResponse,
  onResponseChange,
}) => {
  const [localSelectedResponse, setLocalSelectedResponse] = useState<string>(selectedResponse);

  useEffect(() => {
    setLocalSelectedResponse(selectedResponse);
  }, [selectedResponse]);

  const handleResponseChange = (event: SelectChangeEvent<string>) => {
    const response = event.target.value as string;
    setLocalSelectedResponse(response);
    onResponseChange(response);
  };

  return (
    <Card sx={{ backgroundColor: color, padding: 4, mb: 2 }}>
      <Box sx={{ display: "flex", mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: "50px",
            color: "white",
            marginRight: 2,
          }}
        >
          {questionNumber < 10 ? `0${questionNumber}` : questionNumber}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "24px", color: "white" }}
        >
          {`${question}`}
        </Typography>
      </Box>

      <FormControl fullWidth sx={{ mt: 1 }}>
      <InputLabel shrink={localSelectedResponse !== ""}>
        {localSelectedResponse === "" ? "Selecciona una respuesta" : ""}
      </InputLabel>
        <Select
          labelId={`response-label-${questionNumber}`}
          value={localSelectedResponse}
          onChange={handleResponseChange}
          label="Respuesta"
          sx={{
            backgroundColor: "white",
            borderColor: "white",
            borderRadius: "16px",
            fontWeight: "bold",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent", // Borde transparente por defecto
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSelect-select": {
              borderRadius: "16px",
              borderColor: "white",
            },
          }}
        >
          {responses.map((response, index) => (
            <MenuItem key={index} value={response} sx={{ fontWeight: "bold" }}>
              {response}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Card>
  );
};

export default Question;
