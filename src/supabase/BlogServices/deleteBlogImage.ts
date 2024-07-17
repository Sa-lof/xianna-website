import supabase from '../../supabaseClient';

const deleteBlogImage = async (imagePath: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage.from('Blogs').remove([imagePath]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export default deleteBlogImage;
