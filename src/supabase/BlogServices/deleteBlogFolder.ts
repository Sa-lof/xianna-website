import supabase from '../../supabaseClient';

const deleteBlogFolder = async (blogId: number): Promise<boolean> => {
  try {
    const { data: files, error: listError } = await supabase
      .storage
      .from('Blogs')
      .list(`uploads/${blogId}`);

    if (listError) {
      throw listError;
    }

    if (files && files.length > 0) {
      const filePaths = files.map(file => `uploads/${blogId}/${file.name}`);
      
      const { error: deleteError } = await supabase
        .storage
        .from('Blogs')
        .remove(filePaths);

      if (deleteError) {
        throw deleteError;
      }
    }

    return true;
  } catch (error) {
    console.error('Error deleting blog folder:', error);
    return false;
  }
};

export default deleteBlogFolder;
