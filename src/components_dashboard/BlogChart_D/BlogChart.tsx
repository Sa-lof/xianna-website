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

interface Categoria {
  id: number;
  categoria: string;
}

interface BlogChartProps {
  data: ChartData;
  selectedCategoria: string;
  categorias: Categoria[];
  handleCategoriaChange: (event: SelectChangeEvent<string>) => void;
}

const BlogChart: React.FC<BlogChartProps> = ({ data, selectedCategoria, categorias, handleCategoriaChange }) => {
  return (
    <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0', marginTop: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Categoría</InputLabel>
          <Select
            label="Categoría"
            value={selectedCategoria}
            onChange={handleCategoriaChange}
            input={<OutlinedInput label="Categoría" />}
            renderValue={(selected) => selected}
          >
            <MenuItem value="Todos">
              <Checkbox checked={selectedCategoria === 'Todos'} />
              <ListItemText primary="Todos" />
            </MenuItem>
            {categorias.map(categoria => (
              <MenuItem key={categoria.id} value={categoria.categoria}>
                <Checkbox checked={selectedCategoria === categoria.categoria} />
                <ListItemText primary={categoria.categoria} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography variant="h5" fontWeight="bold">Calificaciones de Blogs</Typography>
      <Chart
        options={{
          chart: {
            type: 'bar',
          },
          xaxis: {
            categories: data.categories,
          },
          yaxis: {
            min: 1,
            max: 5,
            tickAmount: 4, // Number of ticks on the y-axis
            labels: {
              formatter: function (val: number) {
                return val.toFixed(0); // Show axis labels without decimals
              }
            }
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'center', // show data labels in the center of the bar
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val: number) {
              return val.toFixed(1); // Reduce values to one decimal
            },
            style: {
              colors: ['#fff']
            }
          },
          title: {
            text: 'Calificaciones de Blogs',
            align: 'center',
          },
        }}
        series={data.series}
        type="bar"
        height="350"
      />
    </Card>
  );
};

export default BlogChart;
