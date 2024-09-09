import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Checkbox, ListItemText } from '@mui/material';
import getUsers from '../../supabase/UsersServices/getUsers';
import getStyles from '../../supabase/CuestionarioServices/getStyles';
import getFavorites from '../../supabase/InsightServices/getFavorites';
import getOutfits from '../../supabase/InsightServices/getOutfits';
import getBlogs from '../../supabase/BlogServices/getBlogs';
import StyleChart from '../StyleChart_D/StyleChart';
import BlogRatingChart from '../BlogRatingChart/BlogRatingChart';
import Chart from 'react-apexcharts';
import { Style } from '../../supabase/CatalogoServices/types';
import Loader from '../../../src/components/Loader/Loader';

interface User {
  id: number;
  correo: string;
  ciudad: string;
  nombre: string;
  tipo_estilo: number;
  profesion: string;
  edad: number;
  talla: string;
  tipo_cuerpo: string;
  avatar?: string;
}

interface Favorite {
  id: number;
  usuario: string;
  outfit: number;
}

interface Outfit {
  id: number;
  nombre: string;
  descripcion: string;
  id_estilo: number;
}

interface ChartData {
  categories: string[];
  series: number[];
}

const Insights: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [chartData, setChartData] = useState<ChartData>({ categories: [], series: [] });
  const [favoritesChartData, setFavoritesChartData] = useState<{ name: string, data: { x: string, y: number }[] }[]>([]);
  const [mostSavedOutfit, setMostSavedOutfit] = useState<string>('');
  const [mostRatedCategory, setMostRatedCategory] = useState<string>('');
  const [ageRanges, setAgeRanges] = useState<string[]>(['0-100']);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [pyramidData, setPyramidData] = useState<{ categories: string[], series: { name: string, data: number[] }[] }>({ categories: [], series: [] });

  const [selectedProfession, setSelectedProfession] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [mostPopularStyle, setMostPopularStyle] = useState<string | null>(null);
  const [mostPopularBodyTypeOverall, setMostPopularBodyTypeOverall] = useState<string | null>(null);
  const [mostPopularCity, setMostPopularCity] = useState<string | null>(null);

  useEffect(() => {
    if (users.length > 0) {
      const cityCounts: { [key: string]: number } = {};
      users.forEach(user => {
        if (cityCounts[user.ciudad]) {
          cityCounts[user.ciudad]++;
        } else {
          cityCounts[user.ciudad] = 1;
        }
      });
  
      const mostPopularCity = Object.keys(cityCounts).reduce((a, b) =>
        cityCounts[a] > cityCounts[b] ? a : b
      );
  
      setMostPopularCity(mostPopularCity); // Establecer la ciudad más popular
    }
  }, [users]);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const usersData = await getUsers();
      const stylesData = await getStyles();
      const favoritesData = await getFavorites();
      const outfitsData = await getOutfits();
      const blogsData = await getBlogs();

      setUsers(usersData);
      setStyles(stylesData);
      setFavorites(favoritesData);
      setOutfits(outfitsData);

      // Determine the most rated category from the blogs data
      const categoryCounts: { [key: string]: number } = {};
      blogsData.forEach(blog => {
        const category = blog.categoria;
        if (!categoryCounts[category]) {
          categoryCounts[category] = 0;
        }
        categoryCounts[category]++;
      });
      const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
      if (sortedCategories.length > 0) {
        setMostRatedCategory(sortedCategories[0][0]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users.length > 0 && styles.length > 0) {
      const filteredUsers = users.filter(user => {
        const isInAgeRange = ageRanges.some(range => {
          const [min, max] = range.split('-').map(Number);
          return user.edad >= min && user.edad <= max;
        });
  
        const isInSelectedStyles = selectedStyles.length === 0 || 
                                    (user.tipo_estilo !== null && selectedStyles.includes(user.tipo_estilo.toString()));
  
        return isInAgeRange && isInSelectedStyles;
      });
  
      const styleCounts = styles.map(style => ({
        style: style.tipo,
        count: filteredUsers.filter(user => user.tipo_estilo === style.id).length,
      }));
  
      const mostPopularStyle = styleCounts.reduce((max, style) => style.count > max.count ? style : max, styleCounts[0]);
      
      setChartData({
        categories: styleCounts.map(item => item.style),
        series: styleCounts.map(item => item.count),
      });
      setTotalUsers(filteredUsers.length);
      setMostPopularStyle(mostPopularStyle.style); // Establecer el estilo más popular
    }
  }, [users, styles, ageRanges, selectedStyles]);
  
  useEffect(() => {
    const filteredUsers = users.filter(user => {
      const professionMatches = selectedProfession.length === 0 || selectedProfession.includes(user.profesion);
      const sizeMatches = selectedSize.length === 0 || selectedSize.includes(user.talla);
      return professionMatches && sizeMatches;
    });
  
    const bodyTypeCounts = {
      Delgado: filteredUsers.filter(user => user.tipo_cuerpo === 'Delgado').length,
      Atlético: filteredUsers.filter(user => user.tipo_cuerpo === 'Atlético').length,
      Robusto: filteredUsers.filter(user => user.tipo_cuerpo === 'Robusto').length,
      Musculoso: filteredUsers.filter(user => user.tipo_cuerpo === 'Musculoso').length
    };
  
    setPyramidData({
      categories: ['Delgado', 'Atlético', 'Robusto', 'Musculoso'],
      series: [
        {
          name: 'Usuarios',
          data: [bodyTypeCounts.Delgado, bodyTypeCounts.Atlético, bodyTypeCounts.Robusto, bodyTypeCounts.Musculoso],
        }
      ],
    });
  }, [users, selectedProfession, selectedSize]);

  useEffect(() => {
    const filteredUsers = users.filter(user => {
      const professionMatches = selectedProfession.length === 0 || selectedProfession.includes(user.profesion);
      const sizeMatches = selectedSize.length === 0 || selectedSize.includes(user.talla);
      return professionMatches && sizeMatches;
    });

    const bodyTypeCounts = {
      Delgado: filteredUsers.filter(user => user.tipo_cuerpo === 'Delgado').length,
      Atlético: filteredUsers.filter(user => user.tipo_cuerpo === 'Atlético').length,
      Robusto: filteredUsers.filter(user => user.tipo_cuerpo === 'Robusto').length,
    };

    setPyramidData({
      categories: ['Delgado', 'Atlético', 'Robusto', 'Musculoso'],
      series: [
        {
          name: 'Usuarios',
          data: [bodyTypeCounts.Delgado, bodyTypeCounts.Atlético, bodyTypeCounts.Robusto],
        }
      ],
    });
  }, [users, selectedProfession, selectedSize]);

  useEffect(() => {
    if (favorites.length > 0 && outfits.length > 0) {
      const outfitCounts = outfits.map(outfit => ({
        nombre: outfit.nombre,
        count: favorites.filter(favorite => favorite.outfit === outfit.id).length,
      }));
  
      // Ordenar por la cantidad de veces que se ha guardado cada outfit
      const sortedOutfits = outfitCounts.sort((a, b) => b.count - a.count);
  
      // Tomar solo los 4 primeros
      const top4Outfits = sortedOutfits.slice(0, 10);
  
      setFavoritesChartData([{
        name: 'Número de veces guardado',
        data: top4Outfits.map(item => ({
          x: item.nombre,
          y: item.count
        })),
      }]);
  
      const mostSaved = top4Outfits.reduce((prev, current) => (prev.count > current.count) ? prev : current, top4Outfits[0]);
      setMostSavedOutfit(mostSaved.nombre);
    }
  }, [favorites, outfits]);  

  useEffect(() => {
    if (users.length > 0) {
      // Contar la cantidad de usuarios por tipo de cuerpo
      const bodyTypeCounts = {
        Delgado: users.filter(user => user.tipo_cuerpo === 'Delgado').length,
        Atlético: users.filter(user => user.tipo_cuerpo === 'Atlético').length,
        Robusto: users.filter(user => user.tipo_cuerpo === 'Robusto').length,
        Musculoso: users.filter(user => user.tipo_cuerpo === 'Musculoso').length
      };
  
      // Encontrar el tipo de cuerpo más popular
      const mostPopularBodyTypeOverall = (Object.keys(bodyTypeCounts) as Array<keyof typeof bodyTypeCounts>).reduce(
        (a, b) => bodyTypeCounts[a] > bodyTypeCounts[b] ? a : b
      );
  
      setMostPopularBodyTypeOverall(mostPopularBodyTypeOverall); // Establecer el tipo de cuerpo más popular
    }
  }, [users]);  

  const handleAgeRangeChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setAgeRanges(typeof value === 'string' ? value.split(',') : value);
  };

  const handleStyleChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    const selected = typeof value === 'string' ? value.split(',') : value;
    setSelectedStyles(selected);
  };

  const handleProfessionChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setSelectedProfession(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSizeChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setSelectedSize(typeof value === 'string' ? value.split(',') : value);
  };

  const treemapChartOptions = {
    chart: {
      type: 'treemap' as const,
    },
    colors: ['#E61F93', '#FDE12D', '#00D1ED', '#FAACC1'],
    title: {
      text: 'Usuarios que guardaron el outfit'
    },
    plotOptions: {
      treemap: {
        distributed: true,
      }
    }
  };

  const pyramidChartOptions = {
    chart: {
      type: 'bar' as const,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
    xaxis: {
      categories: pyramidData.categories,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return Math.abs(val).toString();
        }
      }
    },
    colors: ['#FDE12D', '#00D1ED', '#FAACC1', '#E61F93'],
  };  

  return (
    <Box sx={{ padding: 2 }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, flexWrap: 'wrap' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ flex: '1 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
              Insights
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px', height: '100%' }}>
                <Typography variant="h6" fontWeight="bold">{users.length}</Typography>
                <Typography variant="body1">Usuarios</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px', height: '100%' }}>
                <Typography variant="h6" fontWeight="bold">{mostSavedOutfit}</Typography>
                <Typography variant="body1">Outfit más guardado</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px', height: '100%' }}>
                <Typography variant="h6" fontWeight="bold">{mostRatedCategory}</Typography>
                <Typography variant="body1">Blog preferido</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <StyleChart 
                data={chartData} 
                totalUsers={totalUsers} 
                ageRanges={ageRanges} 
                selectedStyles={selectedStyles} 
                styles={styles} 
                handleAgeRangeChange={handleAgeRangeChange} 
                handleStyleChange={handleStyleChange} 
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Card sx={{ height: '100%', padding:'5%', borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
                <Typography variant="h5" fontWeight="bold">Outfits favoritos</Typography>
                <Chart options={treemapChartOptions} series={favoritesChartData} type="treemap" height="95%" />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
                <BlogRatingChart />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
  <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
      <FormControl fullWidth sx={{ mb: 2, width: '45%' }}>
        <InputLabel>Profesión</InputLabel>
        <Select
          multiple
          value={selectedProfession}
          onChange={handleProfessionChange}
          renderValue={(selected) => selected.join(', ')}
        >
          <MenuItem value="Ingeniero">
            <Checkbox checked={selectedProfession.indexOf('Ingeniero') > -1} />
            <ListItemText primary="Ingeniero" />
          </MenuItem>
          <MenuItem value="Doctor">
            <Checkbox checked={selectedProfession.indexOf('Doctor') > -1} />
            <ListItemText primary="Doctor" />
          </MenuItem>
          <MenuItem value="Abogada">
            <Checkbox checked={selectedProfession.indexOf('Abogada') > -1} />
            <ListItemText primary="Abogada" />
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2, width: '45%' }}>
        <InputLabel>Talla</InputLabel>
        <Select
          multiple
          value={selectedSize}
          onChange={handleSizeChange}
          renderValue={(selected) => selected.join(', ')}
        >
          <MenuItem value="XS">
            <Checkbox checked={selectedSize.indexOf('XS') > -1} />
            <ListItemText primary="XS" />
          </MenuItem>
          <MenuItem value="S">
            <Checkbox checked={selectedSize.indexOf('S') > -1} />
            <ListItemText primary="S" />
          </MenuItem>
          <MenuItem value="M">
            <Checkbox checked={selectedSize.indexOf('M') > -1} />
            <ListItemText primary="M" />
          </MenuItem>
          <MenuItem value="L">
            <Checkbox checked={selectedSize.indexOf('L') > -1} />
            <ListItemText primary="L" />
          </MenuItem>
          <MenuItem value="XL">
            <Checkbox checked={selectedSize.indexOf('XL') > -1} />
            <ListItemText primary="XL" />
          </MenuItem>
          <MenuItem value="XXL">
            <Checkbox checked={selectedSize.indexOf('XXL') > -1} />
            <ListItemText primary="XXL" />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Typography variant="h5" fontWeight="bold">Distribución de Usuarios por Tipo de Cuerpo</Typography>
    <Chart options={pyramidChartOptions} series={pyramidData.series} type="bar" height={400} />
  </Card>
</Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginBottom: '10%' }}>
  <Card
    sx={{
      padding: 2,
      textAlign: 'center',
      borderRadius: '16px',
      height: '150px',
      display: 'flex',               // Flexbox para centrar
      justifyContent: 'center',      // Centra horizontalmente
      alignItems: 'center'           // Centra verticalmente
    }}
  >
    <Box>
      <Typography variant="h6" fontWeight="bold">
        {mostPopularStyle}
      </Typography>
      <Typography variant="body1">Estilo más popular en usuarios</Typography>
    </Box>
  </Card>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginBottom: '10%' }}>
  <Card
    sx={{
      padding: 2,
      textAlign: 'center',
      borderRadius: '16px',
      height: '150px',
      display: 'flex',               // Flexbox para centrar
      justifyContent: 'center',      // Centra horizontalmente
      alignItems: 'center'           // Centra verticalmente
    }}
  >
    <Box>
      <Typography variant="h6" fontWeight="bold">
        {mostPopularBodyTypeOverall}
      </Typography>
      <Typography variant="body1">Tipo de cuerpo más popular</Typography>
    </Box>
  </Card>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginBottom: '10%' }}>
  <Card
    sx={{
      padding: 2,
      textAlign: 'center',
      borderRadius: '16px',
      height: '150px',
      display: 'flex',               // Flexbox para centrar
      justifyContent: 'center',      // Centra horizontalmente
      alignItems: 'center'           // Centra verticalmente
    }}
  >
    <Box>
      <Typography variant="h6" fontWeight="bold">
        {mostPopularCity}
      </Typography>
      <Typography variant="body1">Origen más popular en usuarios</Typography>
    </Box>
  </Card>
</Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Insights;
