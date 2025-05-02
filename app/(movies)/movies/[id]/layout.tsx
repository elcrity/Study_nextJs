import { Suspense } from "react";
import MovieInfo from "../../../../Component/movie-info";

type Params = Promise<{ id: string }>;

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