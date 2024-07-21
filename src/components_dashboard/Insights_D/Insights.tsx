import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, Button, SelectChangeEvent } from '@mui/material';
import getUsers from '../../supabase/UsersServices/getUsers';
import getStyles from '../../supabase/CuestionarioServices/getStyles';
import getFavorites from '../../supabase/InsightServices/getFavorites';
import getOutfits from '../../supabase/InsightServices/getOutfits';
import getBlogs from '../../supabase/BlogServices/getBlogs';
import getBlogRatings from '../../supabase/InsightServices/getBlogRatings';
import getCategorias from '../../supabase/InsightServices/getCategorias';
import StyleChart from '../StyleChart_D/StyleChart';
import BlogChart from '../BlogChart_D/BlogChart';
import Chart from 'react-apexcharts';
import { Style } from '../../supabase/CatalogoServices/types';

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

interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  id_categoria: number;
  categoria: string;
  image: string;
}

interface BlogRating {
  id: number;
  blog: number;
  calificacion: number;
}

interface Categoria {
  id: number;
  categoria: string;
}

interface ChartData {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

const Insights: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogRatings, setBlogRatings] = useState<BlogRating[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('Todos');
  const [chartData, setChartData] = useState<ChartData>({ categories: [], series: [] });
  const [favoritesChartData, setFavoritesChartData] = useState<{ name: string, data: { x: string, y: number }[] }[]>([]);
  const [blogRatingsChartData, setBlogRatingsChartData] = useState<ChartData>({ categories: [], series: [] });
  const [mostSavedOutfit, setMostSavedOutfit] = useState<string>('');
  const [mostRatedCategory, setMostRatedCategory] = useState<string>('');
  const [ageRanges, setAgeRanges] = useState<string[]>(['0-100']);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Todos']);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getUsers();
      const stylesData = await getStyles();
      const favoritesData = await getFavorites();
      const outfitsData = await getOutfits();
      const blogsData = await getBlogs();
      const blogRatingsData = await getBlogRatings();
      const categoriasData = await getCategorias();

      setUsers(usersData);
      setStyles(stylesData);
      setFavorites(favoritesData);
      setOutfits(outfitsData);
      setBlogs(blogsData);
      setBlogRatings(blogRatingsData);
      setCategorias(categoriasData);
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
        series: [{
          name: 'Usuarios',
          data: styleCounts.map(item => item.count),
        }],
      });
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

  useEffect(() => {
    if (blogs.length > 0 && blogRatings.length > 0) {
      const filteredBlogs = selectedCategoria === 'Todos' ? blogs : blogs.filter(blog => blog.categoria === selectedCategoria);
      const blogRatingCounts = filteredBlogs.map(blog => ({
        titulo: blog.titulo,
        avgRating: blogRatings.filter(rating => rating.blog === blog.id).reduce((acc, curr) => acc + curr.calificacion, 0) / blogRatings.filter(rating => rating.blog === blog.id).length,
      }));

      setBlogRatingsChartData({
        categories: blogRatingCounts.map(item => item.titulo),
        series: [{
          name: 'Calificación promedio',
          data: blogRatingCounts.map(item => item.avgRating),
        }],
      });

      const categoryRatingCounts = categorias.map(categoria => ({
        categoria: categoria.categoria,
        ratingCount: blogRatingCounts.filter(blog => blogs.find(b => b.titulo === blog.titulo)?.categoria === categoria.categoria)
                                     .reduce((acc, blog) => acc + blog.avgRating, 0),
      }));

      const mostRated = categoryRatingCounts.reduce((prev, current) => (prev.ratingCount > current.ratingCount) ? prev : current, categoryRatingCounts[0]);
      setMostRatedCategory(mostRated.categoria);
    }
  }, [blogs, blogRatings, categorias, selectedCategoria]);

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

  const handleCategoriaChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategoria(event.target.value);
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, flexWrap: 'wrap' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ flex: '1 1 auto', marginBottom: { xs: 1, sm: 0 } }}>
          Insights
        </Typography>
        <Button variant="contained" sx={{ borderRadius: '20px', backgroundColor: '#E61F93', flex: '0 1 auto', marginTop: { xs: 1, sm: 0 } }}>
          Reporte
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold">{users.length}</Typography>
            <Typography variant="body1">Usuarios</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold">Outfit más guardado</Typography>
            <Typography variant="body1">{mostSavedOutfit}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 2, textAlign: 'center', borderRadius: '16px' }}>
            <Typography variant="h6" fontWeight="bold">Blog preferido</Typography>
            <Typography variant="body1">{mostRatedCategory}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <StyleChart 
            data={chartData} 
            ageRanges={ageRanges} 
            selectedStyles={selectedStyles} 
            styles={styles} 
            handleAgeRangeChange={handleAgeRangeChange} 
            handleStyleChange={handleStyleChange} 
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card sx={{ padding: 2, borderRadius: '16px', backgroundColor: '#f0f0f0' }}>
            <Typography variant="h5" fontWeight="bold">Outfits favoritos</Typography>
            <Chart options={treemapChartOptions} series={favoritesChartData} type="treemap" height={350} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <BlogChart
            data={blogRatingsChartData}
            selectedCategoria={selectedCategoria}
            categorias={categorias}
            handleCategoriaChange={handleCategoriaChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Insights;
