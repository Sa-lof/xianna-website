import supabase from '../../supabaseClient';

export const getFavorites = async (email: string) => {
  const { data: favoritos, error } = await supabase
    .from('favoritos')
    .select('outfit')
    .eq('usuario', email);

  if (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }

  return favoritos.map(fav => fav.outfit);
};

export const addFavorite = async (email: string, outfitId: number) => {
  const { error } = await supabase
    .from('favoritos')
    .insert([{ usuario: email, outfit: outfitId }]);

  if (error) {
    console.error('Error adding favorite:', error);
    return false;
  }

  return true;
};

export const removeFavorite = async (email: string, outfitId: number) => {
  const { error } = await supabase
    .from('favoritos')
    .delete()
    .eq('usuario', email)
    .eq('outfit', outfitId);

  if (error) {
    console.error('Error removing favorite:', error);
    return false;
  }

  return true;
};
