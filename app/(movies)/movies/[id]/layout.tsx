import { Suspense } from "react";
import MovieInfo from "../../../../Component/movie-info";
import Link from "next/link";


export default function MovieLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={params.id} />
      </Suspense>

      {/* Outlet 위치 - credits, providers가 이 자리에 렌더링 */}
      <Suspense>
        {children}
      </Suspense>
    </div>
  );
}