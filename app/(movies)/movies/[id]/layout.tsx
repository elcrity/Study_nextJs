import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../Component/movie-info";
import { Metadata } from "next";

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  return {
    title: movie.title,
  };
}

export default async function MovieLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: Params; 
}) {
  const { id } = await params; // params를 비동기적으로 처리

  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      {/* Outlet 위치 - credits, providers가 이 자리에 렌더링 */}
      <Suspense>
        {children}
      </Suspense>
    </div>
  );
}