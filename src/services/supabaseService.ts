import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fkweyjkmjgluvbaydsac.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd2V5amttamdsdXZiYXlkc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2NDk3MDQsImV4cCI6MjAzNjIyNTcwNH0.HX6g0Mc8tpnaq1iHkhmGKLEx4S17h96tMiIWKngKVOw';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchOutfits = async () => {
    const { data, error } = await supabase
      .from('outfits')
      .select('id_outfit, nombre, descripcion, id_estilo');
    if (error) throw error;
  
    const outfitsWithImageURLs = await Promise.all(data.map(async (outfit) => {
      const { data: listData, error: listError } = await supabase
        .storage
        .from('Prendas')
        .list(`uploads/${outfit.id_outfit}/principal`, { limit: 1 });
      if (listError) throw listError;
      const imageName = listData && listData.length > 0 ? listData[0].name : null;
  
      const { data: publicUrlData } = imageName ? supabase
        .storage
        .from('Prendas')
        .getPublicUrl(`uploads/${outfit.id_outfit}/principal/${imageName}`) : { data: { publicUrl: '' } };
  
      return {
        ...outfit,
        imageUrl: publicUrlData.publicUrl,
      };
    }));
  
    return outfitsWithImageURLs;
  };
  
  export const fetchEstilos = async () => {
    const { data, error } = await supabase
      .from('estilos')
      .select('id_estilo, tipo');
    if (error) throw error;
    return data;
  };
  
  export const fetchOutfitOcasiones = async () => {
    const { data, error } = await supabase
      .from('outfit_ocasion')
      .select('id_outfit, id_ocasion');
    if (error) throw error;
    return data;
  };
  
  export const fetchOcasiones = async () => {
    const { data, error } = await supabase
      .from('ocasiones')
      .select('id_ocasion, ocasion');
    if (error) throw error;
    return data;
  };
  
  export const fetchOutfitById = async (id_outfit: number) => {
    const { data: outfitData, error: outfitError } = await supabase
      .from('outfits')
      .select('id_outfit, nombre, descripcion, id_estilo')
      .eq('id_outfit', id_outfit)
      .single();
    if (outfitError) throw outfitError;
  
    const { data: prendasData, error: prendasError } = await supabase
      .from('prendas')
      .select('nombre, link')
      .eq('id_outfit', id_outfit);
    if (prendasError) throw prendasError;
  
    const { data: outfitOcasionesData, error: outfitOcasionesError } = await supabase
      .from('outfit_ocasion')
      .select('id_ocasion')
      .eq('id_outfit', id_outfit);
    if (outfitOcasionesError) throw outfitOcasionesError;
  
    const ocasiones = outfitOcasionesData.map((item: any) => item.id_ocasion);
  
    const { data: listData, error: listError } = await supabase
      .storage
      .from('Prendas')
      .list(`uploads/${id_outfit}/principal`, { limit: 1 });
    if (listError) throw listError;
    const imageName = listData && listData.length > 0 ? listData[0].name : null;
  
    const { data: publicUrlData } = imageName ? supabase
      .storage
      .from('Prendas')
      .getPublicUrl(`uploads/${id_outfit}/principal/${imageName}`) : { data: { publicUrl: '' } };
  
    const prendasWithImageUrls = await Promise.all(prendasData.map(async (prenda: any, index: number) => {
      const prendaImagePath = `uploads/${id_outfit}/prenda_${index + 1}`;
      const { data: prendaListData, error: prendaListError } = await supabase
        .storage
        .from('Prendas')
        .list(prendaImagePath, { limit: 1 });
      if (prendaListError) throw prendaListError;
  
      const prendaImageName = prendaListData && prendaListData.length > 0 ? prendaListData[0].name : null;
  
      const { data: prendaPublicUrlData } = prendaImageName ? supabase
        .storage
        .from('Prendas')
        .getPublicUrl(`${prendaImagePath}/${prendaImageName}`) : { data: { publicUrl: '' } };
  
      return {
        ...prenda,
        imageUrl: prendaPublicUrlData.publicUrl,
      };
    }));
  
    return {
      ...outfitData,
      imageUrl: publicUrlData.publicUrl,
      prendas: prendasWithImageUrls,
      ocasiones,
    };
  };
  