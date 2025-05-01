import { Suspense } from "react";
import MovieCredits from "../../../../../Component/movie-credits";

type Params = Promise<{ id: string }>;

export default async function MovieCreditsPage({ params }: { params: Params }) {
    const { id } = await params; // 비동기적으로 params 처리

    return (
        <div>
            <Suspense>
                <MovieCredits id={id} />
            </Suspense>
        </div>
    );
}
