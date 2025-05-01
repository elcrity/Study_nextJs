import Link from "next/link";
import styles from "../styles/movei-info.module.css"
import { API_URL } from "../app/constants";



export async function getMovie(id: string) {
    return fetch(`${API_URL}/${id}`).then(response => response.json())
}

export default async function MovieInfo({ id }: { id: string }) {
    const movie = await getMovie(id);
    return <div className={styles.container}>
        <img className={styles.poster} src={movie.poster_path} alt={movie.title} />
        <div className={styles.info}>
            <h1 className={styles.title}>{movie.title}</h1>
            <h3 className={styles.average}>⭐️{movie.vote_average.toFixed(1)}</h3>
            <p className={styles.info}>{movie.overview}</p>
            <p>상영시간 : {movie.runtime}분</p>
            <div className={styles.link}>
                <a href={movie.homepage} target="_blank">🏠Homepage</a>
                <Link prefetch href={`/movies/${id}`}>
                    🎬관련 영상
                </Link>
                <Link prefetch href={`/movies/${id}/similar`}>
                    🎥비슷한 영화
                </Link>
                <Link prefetch href={`/movies/${id}/credits`}>
                    🧑‍🦲출연/배역
                </Link>
            </div>
        </div>
    </div>
}