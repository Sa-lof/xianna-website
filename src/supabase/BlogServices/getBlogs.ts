import supabase from '../../supabaseClient';

interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  id_categoria: number;
  categoria: string;
  image: string;
}

const getBlogs = async (): Promise<Blog[]> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        id,
        titulo,
        descripcion,
        contenido,
        id_categoria,
        categoria_blog ( categoria )
      `);

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
          : 'https://via.placeholder.com/150'; // Default image if none found

        return {
          id: blog.id,
          titulo: blog.titulo,
          descripcion: blog.descripcion,
          contenido: blog.contenido,
          id_categoria: blog.id_categoria,
          categoria: blog.categoria_blog.categoria,
          image: imageUrl,
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
