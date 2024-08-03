import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, SelectChangeEvent } from '@mui/material';
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
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Todos']);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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
        const isInSelectedStyles = selectedStyles.includes('Todos') || selectedStyles.includes(user.tipo_estilo.toString());
        return isInAgeRange && isInSelectedStyles;
      });

      const styleCounts = styles.map(style => ({
        style: style.tipo,
        count: filteredUsers.filter(user => user.tipo_estilo === style.id).length,
      }));

      setChartData({
        categories: styleCounts.map(item => item.style),
        series: styleCounts.map(item => item.count),
      });
      setTotalUsers(filteredUsers.length);
    }
  }, [users, styles, ageRanges, selectedStyles]);

  useEffect(() => {
    if (favorites.length > 0 && outfits.length > 0) {
      const outfitCounts = outfits.map(outfit => ({
        nombre: outfit.nombre,
        count: favorites.filter(favorite => favorite.outfit === outfit.id).length,
      }));

      setFavoritesChartData([{
        name: 'Número de veces guardado',
        data: outfitCounts.map(item => ({
          x: item.nombre,
          y: item.count
        })),
      }]);

      const mostSaved = outfitCounts.reduce((prev, current) => (prev.count > current.count) ? prev : current, outfitCounts[0]);
      setMostSavedOutfit(mostSaved.nombre);
    }
  }, [favorites, outfits]);

  const handleAgeRangeChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setAgeRanges(typeof value === 'string' ? value.split(',') : value);
  };

  const handleStyleChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    const selected = typeof value === 'string' ? value.split(',') : value;
    if (selected.includes('Todos')) {
      setSelectedStyles(['Todos']);
    } else {
      setSelectedStyles(selected);
    }
  };

  const treemapChartOptions = {
    chart: {
      type: 'treemap' as const,
    },
    title: {
      text: 'Usuarios que guardaron el outfit'
    }
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
                <Typography variant="h6" fontWeight="bold">Outfit más guardado</Typography>
                <Typography variant="body1">{mostSavedOutfit}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px', height: '100%' }}>
                <Typography variant="h6" fontWeight="bold">Blog preferido</Typography>
                <Typography variant="body1">{mostRatedCategory}</Typography>
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
              <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0', height: '100%' }}>
                <Typography variant="h5" fontWeight="bold">Outfits favoritos</Typography>
                <Chart options={treemapChartOptions} series={favoritesChartData} type="treemap" height="350px" />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
                <Typography variant="h5" fontWeight="bold">Promedio de Calificaciones por Blog</Typography>
                <BlogRatingChart />
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Insights;
