import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../Component/movie-info";
import MovieVideos from "../../../../Component/movie-videos";
import MovieCredits from "../../../../Component/movie-credits";
import { Metadata } from "next";

// ✅ 타입을 Promise로 선언 (Next 15.1+ 방식)
type Params = Promise<{ id: string }>;

// ✅ generateMetadata에서 await params 사용
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  return {
    title: movie.title,
  };
}

// ✅ default export에서도 동일하게 await params 사용
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