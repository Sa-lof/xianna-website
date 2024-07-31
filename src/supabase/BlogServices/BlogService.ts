import supabase from "../../supabaseClient";
import getBlogs from "../../supabase/BlogServices/getBlogs";
import getBlogImages from "../../supabase/BlogServices/getBlogImages";

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

export const fetchBlog = async (id: number): Promise<Blog | null> => {
  const blogs = await getBlogs();
  const selectedBlog = blogs.find((b) => b.id === Number(id));
  if (selectedBlog) {
    const images = await getBlogImages(selectedBlog.id);
    return { ...selectedBlog, images };
  }
  return null;
};

export const fetchUserEmail = async (): Promise<string | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session && session.user && session.user.email) {
    return session.user.email;
  }
  return null;
};

export const fetchRating = async (blogId: number, userEmail: string | null): Promise<number | null> => {
  if (userEmail) {
    const { data } = await supabase
      .from('blogs_calificados')
      .select('calificacion')
      .eq('blog', blogId)
      .eq('usuario', userEmail)
      .single();

    if (data) {
      return data.calificacion;
    }
  } else {
    const localRating = localStorage.getItem(`rating-${blogId}`);
    if (localRating) {
      return Number(localRating);
    }
  }
  return null;
};

export const submitRating = async (
  blogId: number,
  newRating: number,
  userEmail: string | null,
  existingRating: number | null
): Promise<void> => {
  if (userEmail) {
    if (existingRating !== null) {
      const { error } = await supabase
        .from('blogs_calificados')
        .update({ calificacion: newRating })
        .eq('blog', blogId)
        .eq('usuario', userEmail);

      if (error) {
        throw new Error(`Error updating rating: ${error.message}`);
      }
    } else {
      const { error } = await supabase
        .from('blogs_calificados')
        .insert([{ blog: blogId, calificacion: newRating, usuario: userEmail }]);

      if (error) {
        throw new Error(`Error inserting rating: ${error.message}`);
      }
    }
  } else {
    const { error } = await supabase
      .from('blogs_calificados')
      .insert([{ blog: blogId, calificacion: newRating, usuario: null }]);

    if (error) {
      throw new Error(`Error inserting anonymous rating: ${error.message}`);
    } else {
      localStorage.setItem(`rating-${blogId}`, String(newRating));
    }
  }
};
