import React from 'react';
import { Card, Box, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, SelectChangeEvent } from '@mui/material';
import Chart from 'react-apexcharts';

interface ChartData {
  categories: string[];
  series: number[];
}

interface StyleChartProps {
  data: ChartData;
  totalUsers: number;
  ageRanges: string[];
  selectedStyles: string[];
  styles: { id: number; tipo: string; descripcion: string }[];
  handleAgeRangeChange: (event: SelectChangeEvent<string[]>) => void;
  handleStyleChange: (event: SelectChangeEvent<string[]>) => void;
}

const StyleChart: React.FC<StyleChartProps> = ({ data, totalUsers, ageRanges, selectedStyles, styles, handleAgeRangeChange, handleStyleChange }) => {
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
            {['0-100', '0-18', '19-25', '26-35', '36-50', '51-100'].map(range => (
              <MenuItem key={range} value={range}>
                <Checkbox checked={ageRanges.indexOf(range) > -1} />
                <ListItemText primary={range === '51-100' ? '51+' : range} />
              </MenuItem>
            ))}
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
            renderValue={(selected) => selected.map(id => styles.find(style => style.id.toString() === id)?.tipo).join(', ')}
          >
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
            type: 'donut',
          },
          colors: ['#E61F93', '#FDE12D', '#00D1ED', '#FAACC1'],
          labels: data.categories,
          dataLabels: {
            enabled: true,
            formatter: (val, opts) => {
              const name = opts.w.globals.labels[opts.seriesIndex];
              return `${name}: ${opts.w.globals.series[opts.seriesIndex]}`;
            }
          },
          legend: {
            show: true,
            position: 'right',
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: () => `${totalUsers} Usuarios`,
                  }
                }
              }
            }
          },
        }}
        series={data.series}
        type="donut"
        height="350"
      />
    </Card>
  );
};

export default StyleChart;
