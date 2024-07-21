import React from 'react';
import { Card, Box, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, SelectChangeEvent } from '@mui/material';
import Chart from 'react-apexcharts';

interface ChartData {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

interface StyleChartProps {
  data: ChartData;
  ageRanges: string[];
  selectedStyles: string[];
  styles: { id: number; tipo: string; descripcion: string }[];
  handleAgeRangeChange: (event: SelectChangeEvent<string[]>) => void;
  handleStyleChange: (event: SelectChangeEvent<string[]>) => void;
}

const StyleChart: React.FC<StyleChartProps> = ({ data, ageRanges, selectedStyles, styles, handleAgeRangeChange, handleStyleChange }) => {
  return (
    <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <FormControl variant="outlined" sx={{ width: '45%' }}>
          <InputLabel>Rango de Edad</InputLabel>
          <Select
            label="Rango de Edad"
            multiple
            value={ageRanges}
            onChange={handleAgeRangeChange}
            input={<OutlinedInput label="Rango de Edad" />}
            renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem value="0-100">
              <Checkbox checked={ageRanges.indexOf('0-100') > -1} />
              <ListItemText primary="Todos" />
            </MenuItem>
            <MenuItem value="0-18">
              <Checkbox checked={ageRanges.indexOf('0-18') > -1} />
              <ListItemText primary="0-18" />
            </MenuItem>
            <MenuItem value="19-25">
              <Checkbox checked={ageRanges.indexOf('19-25') > -1} />
              <ListItemText primary="19-25" />
            </MenuItem>
            <MenuItem value="26-35">
              <Checkbox checked={ageRanges.indexOf('26-35') > -1} />
              <ListItemText primary="26-35" />
            </MenuItem>
            <MenuItem value="36-50">
              <Checkbox checked={ageRanges.indexOf('36-50') > -1} />
              <ListItemText primary="36-50" />
            </MenuItem>
            <MenuItem value="51-100">
              <Checkbox checked={ageRanges.indexOf('51-100') > -1} />
              <ListItemText primary="51+" />
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: '45%' }}>
          <InputLabel>Estilo</InputLabel>
          <Select
            label="Estilo"
            multiple
            value={selectedStyles}
            onChange={handleStyleChange}
            input={<OutlinedInput label="Estilo" />}
            renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem value="Todos">
              <Checkbox checked={selectedStyles.indexOf('Todos') > -1} />
              <ListItemText primary="Todos" />
            </MenuItem>
            {styles.map(style => (
              <MenuItem key={style.id} value={style.id.toString()}>
                <Checkbox checked={selectedStyles.indexOf(style.id.toString()) > -1} />
                <ListItemText primary={style.tipo} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography variant="h5" fontWeight="bold">Usuarios por estilo</Typography>
      <Chart
        options={{
          chart: {
            type: 'bar',
          },
          xaxis: {
            categories: data.categories,
          },
        }}
        series={data.series}
        type="bar"
        height="350"
      />
    </Card>
  );
};

export default StyleChart;
