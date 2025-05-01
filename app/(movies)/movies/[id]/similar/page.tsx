import { Suspense } from "react";
import MovieSimilar from "../../../../../Component/movie-similar"

interface IParams {
    params: { id: string };
}

export default async function MovieDetailPage({ params }: IParams) {
    const { id } = await params;
    return (
        <div>
            <Suspense fallback={<h1>Loading movie Simil</h1>}>
                <MovieSimilar id={id}/>
            </Suspense>
        </div>
        )
}