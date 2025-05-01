import { Suspense } from "react";
import MovieSimilar from "../../../../../Component/movie-similar"

interface IParams {
    params: Promise<{ id: string }>;
}

export default async function SimilarPage({ params }: IParams) {
    const { id } = await params;
    return (
        <div>
            <Suspense fallback={<h1>Loading movie Simil</h1>}>
                <MovieSimilar id={id}/>
            </Suspense>
        </div>
        )
}