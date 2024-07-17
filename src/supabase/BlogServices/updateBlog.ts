import supabase from '../../supabaseClient';

interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  id_categoria: number;
}

const updateBlog = async (id: number, blogData: Partial<Blog>): Promise<Blog | null> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update(blogData)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error updating blog:', error);
    return null;
  }
};

export default updateBlog;
