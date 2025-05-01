import Link from "next/link";
import styles from "../styles/movei-info.module.css"
import { API_URL } from "../app/constants";

async function getSimilars(id: string) {
    return fetch(`${API_URL}/${id}/similar`).then(response => response.json())
}


export default async function MovieSimilar({ id }: { id: string }) {
    const similars = await getSimilars(id);

    return (
        <div>
            <Link href={`/movies/${id}`}>
                &larr; 돌아가기
            </Link>
            {similars.map((similar) => (
                <div className={styles.container} key={similar.id}>
                    <img className={styles.poster}
                        src={similar.poster_path}
                        alt={similar.title}/>
                    <div className={styles.info}>
                        <h1 className={styles.title}>{similar.title}</h1>
                        <h3 className={styles.average}>
                            ⭐️{similar.vote_average.toFixed(1)}
                        </h3>
                        <p>{similar.overview}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

