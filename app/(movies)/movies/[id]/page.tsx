import { Suspense } from "react";
import { API_URL } from "../../../(home)/page";
import MovieInfo from "../../../../Component/movie-info";
import MovieVideos from "../../../../Component/movie-videos";

export default function MovieDetail({
    params: { id },
}: {
    params: { id: string };
}) {
    return(
    <div>
        <h3>movie Detail page</h3>
        <Suspense fallback={<h1>Loading movie info</h1>}>
            <MovieInfo id={id} />
        </Suspense>
        <Suspense fallback={<h1>Loading movie videos</h1>}>
            <MovieVideos id={id} />
        </Suspense>
    </div>)
}