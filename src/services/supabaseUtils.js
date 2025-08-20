// supabaseUtils.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rskbayibhrapatiysrzm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza2JheWliaHJhcGF0aXlzcnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NTgzNTYsImV4cCI6MjA3MDUzNDM1Nn0.pUY3ippO8AHtjD76NPK-5P83ms3GsBxSv4eEBdSjAag';
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
