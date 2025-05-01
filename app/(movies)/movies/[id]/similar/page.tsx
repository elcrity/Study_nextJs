import { Suspense } from "react";
import MovieSimilar from "../../../../../Component/movie-similar"
import { API_URL } from "../../../../constants";

interface IParams {
    params: Promise<{ id: string }>;
}

async function getSimilars(id: string) {
    return fetch(`${API_URL}/${id}/similar`).then(response => response.json())
}

export default async function SimilarPage({ params }: IParams) {
    const { id } = await params;
    const similars = await getSimilars(id);

    return (
        <div>
            <Suspense>
                <MovieSimilar similars={similars}/>
            </Suspense>
        </div>
        )
}