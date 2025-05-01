import { Suspense } from "react";
import MovieCredits from "../../../../../Component/movie-credits";

export default function MovieCreditsPage({ params }: { params: { id: string } }) {
    return(<div>
        <Suspense>
            <MovieCredits id={params.id} />;
        </Suspense>
    </div>
    )
}