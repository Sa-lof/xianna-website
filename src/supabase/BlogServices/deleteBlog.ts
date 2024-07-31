import supabase from '../../supabaseClient';

const deleteBlog = async (blogId: number) => {
  // Eliminar las calificaciones asociadas al blog primero
  const { error: ratingError } = await supabase
    .from('blogs_calificados')
    .delete()
    .eq('blog', blogId);

  if (ratingError) {
    console.error('Error deleting blog ratings:', ratingError);
    return false;
  }

  // Luego eliminar el blog
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', blogId);

  if (error) {
    console.error('Error deleting blog:', error);
    return false;
  }

  return true;
};

export default deleteBlog;
