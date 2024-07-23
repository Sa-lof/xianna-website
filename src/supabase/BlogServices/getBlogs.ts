import supabase from '../../supabaseClient';

interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  id_categoria: number;
  categoria: string;
  image: string;
  name: string;
  category: string;
  rating: number;
  persons: number;
  images: string[];
}

const getBlogs = async (): Promise<Blog[]> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select(
        `id,
         titulo,
         descripcion,
         contenido,
         id_categoria,
         categoria_blog ( categoria )`
      );

    if (error) {
      throw error;
    }

    const blogs: Blog[] = await Promise.all(
      data.map(async (blog: any) => {
        const { data: files, error: fileError } = await supabase
          .storage
          .from('Blogs')
          .list(`uploads/${blog.id}`, { limit: 1 });

        if (fileError) {
          throw fileError;
        }

        const imageUrl = files.length > 0
          ? supabase.storage.from('Blogs').getPublicUrl(`uploads/${blog.id}/${files[0].name}`).data.publicUrl
          : 'https://via.placeholder.com/150';

        const { data: ratingsData, error: ratingsError } = await supabase
          .from('blogs_calificados')
          .select('calificacion')
          .eq('blog', blog.id);

        if (ratingsError) {
          throw ratingsError;
        }

        const ratings = ratingsData.map((rating: any) => rating.calificacion);
        const totalRatings = ratings.length;
        const averageRating = totalRatings ? (ratings.reduce((a, b) => a + b, 0) / totalRatings).toFixed(1) : '0.0';

        return {
          id: blog.id,
          titulo: blog.titulo,
          descripcion: blog.descripcion,
          contenido: blog.contenido,
          id_categoria: blog.id_categoria,
          categoria: blog.categoria_blog.categoria,
          image: imageUrl,
          name: blog.titulo,
          category: blog.categoria_blog.categoria,
          rating: parseFloat(averageRating),
          persons: totalRatings,
          images: files.map((file: any) => supabase.storage.from('Blogs').getPublicUrl(`uploads/${blog.id}/${file.name}`).data.publicUrl)
        };
      })
    );

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export default getBlogs;
