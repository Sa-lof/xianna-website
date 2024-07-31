import supabase from '../../supabaseClient';

const getFavorites = async () => {
  const { data, error } = await supabase
    .from('favoritos')
    .select('*');

  if (error) throw error;
  return data;
};

export default getFavorites;