import supabase from '../../supabaseClient';

const postBlogImages = async (blogId: number, images: File[]): Promise<string[]> => {
  try {
    const imageUrls: string[] = [];

    for (const image of images) {
      const { error } = await supabase
        .storage
        .from('Blogs')
        .upload(`uploads/${blogId}/${image.name}`, image);

      if (error) {
        throw error;
      }

      const publicUrl = supabase.storage.from('Blogs').getPublicUrl(`uploads/${blogId}/${image.name}`).data.publicUrl;
      imageUrls.push(publicUrl);
    }

    return imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    return [];
  }
};

export default postBlogImages;
