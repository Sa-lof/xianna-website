import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fkweyjkmjgluvbaydsac.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd2V5amttamdsdXZiYXlkc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2NDk3MDQsImV4cCI6MjAzNjIyNTcwNH0.HX6g0Mc8tpnaq1iHkhmGKLEx4S17h96tMiIWKngKVOw';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchOutfits = async () => {
  const { data, error } = await supabase
    .from('outfits')
    .select('id_outfit, nombre, descripcion, id_estilo');
  if (error) throw error;
  return data;
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
