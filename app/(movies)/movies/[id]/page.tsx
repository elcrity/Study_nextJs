import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../Component/movie-info";
import MovieVideos from "../../../../Component/movie-videos";
import MovieCredits from "../../../../Component/movie-credits";
import { Metadata } from "next";

// 타입을 Promise로 선언 (Next 15.1+)
type Params = Promise<{ id: string }>;

// generateMetadata에서 params -> await params으로 변경
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  return {
    title: movie.title,
  };
}

// MovieDetailPage에서도 동일하게 params -> await params으로 변경
export default async function MovieDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense>
        <MovieCredits id={id} />
      </Suspense>
      <Suspense>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}