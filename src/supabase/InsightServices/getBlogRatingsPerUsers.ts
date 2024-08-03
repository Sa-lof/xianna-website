import supabase from '../../supabaseClient';

interface BlogRating {
  blog: number;
  calificacion: number;
  usuario: string | null;
}

interface Blog {
  id: number;
  titulo: string;
  id_categoria: number;
}

interface Category {
  id: number;
  categoria: string;
}

interface AverageRating {
  blog: number;
  blogName: string;
  registeredAvg: number;
  unregisteredAvg: number;
  overallAvg: number;
}

const getBlogRatingsPerUsers = async (categoryId?: number): Promise<AverageRating[]> => {
  const blogsQuery = supabase.from('blogs').select('id, titulo, id_categoria');
  
  if (categoryId && categoryId !== 0) {
    blogsQuery.eq('id_categoria', categoryId);
  }

  const { data: blogsData, error: blogsError } = await blogsQuery;

  if (blogsError) {
    console.error('Error fetching blogs:', blogsError);
    return [];
  }

  const blogIds = (blogsData as Blog[]).map(blog => blog.id);

  if (blogIds.length === 0) return [];

  const { data: ratingsData, error: ratingsError } = await supabase
    .from('blogs_calificados')
    .select('blog, calificacion, usuario')
    .in('blog', blogIds);

  if (ratingsError) {
    console.error('Error fetching blog ratings:', ratingsError);
    return [];
  }

  const blogMap = new Map<number, { titulo: string, categoria: number }>();
  (blogsData as Blog[]).forEach(blog => {
    blogMap.set(blog.id, { titulo: blog.titulo, categoria: blog.id_categoria });
  });

  const blogRatings: Record<number, { registered: number[]; unregistered: number[] }> = {};

  (ratingsData as BlogRating[]).forEach(({ blog, calificacion, usuario }) => {
    if (!blogRatings[blog]) {
      blogRatings[blog] = { registered: [], unregistered: [] };
    }

    if (usuario) {
      blogRatings[blog].registered.push(calificacion);
    } else {
      blogRatings[blog].unregistered.push(calificacion);
    }
  });

  const averageRatings: AverageRating[] = Object.keys(blogRatings).map(blog => {
    const registeredRatings = blogRatings[Number(blog)].registered;
    const unregisteredRatings = blogRatings[Number(blog)].unregistered;
    const allRatings = [...registeredRatings, ...unregisteredRatings];

    const registeredAvg = registeredRatings.length ? registeredRatings.reduce((a, b) => a + b, 0) / registeredRatings.length : 0;
    const unregisteredAvg = unregisteredRatings.length ? unregisteredRatings.reduce((a, b) => a + b, 0) / unregisteredRatings.length : 0;
    const overallAvg = allRatings.length ? allRatings.reduce((a, b) => a + b, 0) / allRatings.length : 0;

    return {
      blog: Number(blog),
      blogName: blogMap.get(Number(blog))?.titulo || 'Unknown',
      registeredAvg,
      unregisteredAvg,
      overallAvg,
    };
  });

  return averageRatings
    .sort((a, b) => b.overallAvg - a.overallAvg)
    .slice(0, 5);
};

const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categoria_blog')
    .select('id, categoria');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data as Category[];
};

export { getBlogRatingsPerUsers, getCategories };
