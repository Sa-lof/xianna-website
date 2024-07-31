import supabase from '../../supabaseClient';

const getBlogImages = async (blogId: number): Promise<string[]> => {
  try {
    const { data: files, error } = await supabase
      .storage
      .from('Blogs')
      .list(`uploads/${blogId}`);

    if (error) {
      throw error;
    }

    const imageUrls = files.map(file => 
      supabase.storage.from('Blogs').getPublicUrl(`uploads/${blogId}/${file.name}`).data.publicUrl
    );

    return imageUrls;
  } catch (error) {
    console.error('Error fetching blog images:', error);
    return [];
  }
};

export default getBlogImages;
