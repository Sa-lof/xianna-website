import supabase from '../../supabaseClient';

const getOutfits = async () => {
  const { data, error } = await supabase
    .from('outfits')
    .select('*');

  if (error) throw error;
  return data;
};

export default getOutfits;