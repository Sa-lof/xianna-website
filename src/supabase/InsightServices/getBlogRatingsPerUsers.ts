import supabase from '../../supabaseClient';

interface BlogRating {
  blog: number;
  calificacion: number;
  usuario: string | null;
}

interface Blog {
  id: number;
  titulo: string;
}

interface AverageRating {
  blog: number;
  blogName: string;
  registeredAvg: number;
  unregisteredAvg: number;
  overallAvg: number;
}

const getBlogRatingsPerUsers = async (): Promise<AverageRating[]> => {
  const { data: ratingsData, error: ratingsError } = await supabase
    .from('blogs_calificados')
    .select('blog, calificacion, usuario');

  if (ratingsError) {
    console.error('Error fetching blog ratings:', ratingsError);
    return [];
  }

  const { data: blogsData, error: blogsError } = await supabase
    .from('blogs')
    .select('id, titulo');

  if (blogsError) {
    console.error('Error fetching blogs:', blogsError);
    return [];
  }

  const blogMap = new Map<number, string>();
  (blogsData as Blog[]).forEach(blog => {
    blogMap.set(blog.id, blog.titulo);
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
      blogName: blogMap.get(Number(blog)) || 'Unknown',
      registeredAvg,
      unregisteredAvg,
      overallAvg,
    };
  });

  return averageRatings;
};

export default getBlogRatingsPerUsers;
