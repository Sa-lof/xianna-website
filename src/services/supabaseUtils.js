// supabaseUtils.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fkweyjkmjgluvbaydsac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd2V5amttamdsdXZiYXlkc2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2NDk3MDQsImV4cCI6MjAzNjIyNTcwNH0.HX6g0Mc8tpnaq1iHkhmGKLEx4S17h96tMiIWKngKVOw';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateOutfit(id_outfit, updateData) {
  const { data, error } = await supabase
    .from('outfits')
    .update(updateData)
    .eq('id_outfit', id_outfit);

  if (error) {
    console.error('Error updating outfit:', error);
    throw error;
  } else {
    console.log('Outfit updated successfully:', data);
    return data;
  }
}

module.exports = {
  updateOutfit,
};
