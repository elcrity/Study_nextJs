import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-videos.module.css"

async function getVideos(id: string) {
    return fetch(`${API_URL}/${id}/videos`).then(response => response.json())
}

export default async function MovieVideos({ id }: { id: string }) {
    const videos = await getVideos(id);
    if(videos){console.log("data");
    }
    return (
        <div className={styles.head}>
            <h2>관련 영상</h2>
            <div className={styles.container}>
                {videos.map(video => <iframe key={video.id} src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />)}
            </div>
        </div>
    )
}