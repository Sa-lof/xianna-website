import supabase from '../../supabaseClient';

const getCategorias = async () => {
  const { data, error } = await supabase
    .from('categoria_blog')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export default getCategorias;
