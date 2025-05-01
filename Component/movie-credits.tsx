import { API_URL } from "../config";
import styles from "../styles/movie-credits.module.css"

async function getCredits(id: string) {
    return fetch(`${API_URL}/${id}/credits`).then(response => response.json())
}

export default async function MovieCredits({ id }: { id: string }) {
    const credits = await getCredits(id);

    return (
        <div className={styles.head}>
            <h2>감독/출연</h2>
            <div className={styles.credits}>
                {credits.map((credit) => (
                    <div className={styles.credit} key={credit.id}>
                        <img src={credit.profile_path || "https://www.gravatar.com/avatar/?d=mp"}
                            alt={credit.name} />
                        <p>{credit.name}</p>
                        <p>배역 : {credit.character}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}