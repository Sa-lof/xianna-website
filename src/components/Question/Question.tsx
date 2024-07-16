// question.tsx
import React, { useState } from "react";
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
}

const Question: React.FC<QuestionProps> = ({
  color,
  question,
  questionNumber,
  responses,
}) => {
  const [selectedResponse, setSelectedResponse] = useState<string>("");

  const handleResponseChange = (event: SelectChangeEvent<string>) => {
    setSelectedResponse(event.target.value as string);
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
          {`0${questionNumber}`}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "24px", color: "white" }}
        >
          {`${question}`}
        </Typography>
      </Box>

      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel>Selecciona una respuesta</InputLabel>
        <Select
          labelId={`response-label-${questionNumber}`}
          value={selectedResponse}
          onChange={handleResponseChange}
          label="Respuesta"
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            fontWeight: "bold",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSelect-select": {
              borderRadius: "16px",
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
