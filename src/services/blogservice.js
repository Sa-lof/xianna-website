import axios from 'axios';

const supabaseUrl = 'https://ulafgjbgmgqqjxayohmg.supabase.co/rest/v1/blogs';
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYWZnamJnbWdxcWp4YXlvaG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMDIzNTksImV4cCI6MjAzNjY3ODM1OX0.uFPUFuR3KgXqKrWNB_grGXgS0BH2BGXOXD3KEkglMR0';

export const getBlogs = async () => {
  try {
    const response = await axios.get(supabaseUrl, {
      headers: {
        'apikey': supabaseApiKey,
        'Authorization': `Bearer ${supabaseApiKey}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the data!', error);
    throw error;
  }
};

export const updateBlog = async (id, updatedBlog) => {
    try {
      const response = await axios.patch(`${supabaseUrl}?id=eq.${id}`, updatedBlog, {
        headers: {
          'apikey': supabaseApiKey,
          'Authorization': `Bearer ${supabaseApiKey}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, POST, PATCH, PUT, DELETE',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        }
      });
      return response.data;
    } catch (error) {
      console.error('There was an error updating the data!', error);
      throw error;
    }
  };