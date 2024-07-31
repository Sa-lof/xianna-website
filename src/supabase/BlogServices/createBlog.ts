// supabase/createBlog.ts
import supabase from '../../supabaseClient';
import postBlogImages from './postBlogImages';

interface BlogData {
  titulo: string;
  descripcion: string;
  contenido: string;
  id_categoria: number;
  images: File[];
}

interface Blog {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  id_categoria: number;
  images: string[];
}

const createBlog = async (blogData: BlogData): Promise<Blog | null> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          titulo: blogData.titulo,
          descripcion: blogData.descripcion,
          contenido: blogData.contenido,
          id_categoria: blogData.id_categoria
        }
      ])
      .select()
      .single<Blog>();

    if (error) {
      throw error;
    }

    if (data && blogData.images.length > 0) {
      const imageUrls = await postBlogImages(data.id, blogData.images);
      return { ...data, images: imageUrls };
    }

    return { ...data, images: [] };
  } catch (error) {
    console.error('Error creating blog:', error);
    return null;
  }
};

export default createBlog;
