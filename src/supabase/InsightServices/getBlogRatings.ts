import supabase from '../../supabaseClient';

interface BlogRating {
  id: number;
  blog: number;
  calificacion: number;
}

const getBlogRatings = async (): Promise<BlogRating[]> => {
  const { data, error } = await supabase
    .from('blogs_calificados')
    .select('id, blog, calificacion');

  if (error) {
    throw error;
  }

  return data;
};

export default getBlogRatings;
