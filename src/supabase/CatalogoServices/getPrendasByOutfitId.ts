import supabase from '../../supabaseClient';

export const getPrendasByOutfitId = async (id_outfit: number) => {
  const { data, error } = await supabase
    .from('prendas')
    .select('*')
    .eq('id_outfit', id_outfit);

  if (error) {
    console.error('Error fetching prendas:', error);
    return [];
  }

  return data;
};
