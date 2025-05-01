import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../Component/movie-info";
import MovieVideos from "../../../../Component/movie-videos";
import MovieCredits from "../../../../Component/movie-credits";


interface IParams {
    params: { id: string };
}

export async function generateMetadata({ params : {id} }: IParams) {
    // 최신버전 nextjs는 캐싱을 하기때문에 한번 fetch한 데이터는 캐싱해놓고 다시 불러옴, 즉 fetch는 한번만 작동
    const movie = await getMovie(id);
    return {
        title: movie.title,
    }
}

export default async function MovieDetailPage({ params }: IParams) {
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
        )
}