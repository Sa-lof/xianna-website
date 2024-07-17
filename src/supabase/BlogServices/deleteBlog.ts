import supabase from '../../supabaseClient';

const deleteBlog = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting blog:', error);
    return false;
  }
};

export default deleteBlog;
