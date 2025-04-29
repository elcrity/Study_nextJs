import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-videos.module.css"

async function getCredits(id: string) {
    return fetch(`${API_URL}/${id}/credits`).then(response => response.json())
}

export default async function MovieCredits({id} : {id:string}){
    const credits = await getCredits(id);
    
    return (<div>
            {credits.map((credit) => (
                <h6 key={credit.id}>{credit.name}</h6>
            ))}
        </div>)

}