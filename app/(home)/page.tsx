import Link from "next/link";
import styles from "../../styles/home.module.css"
import Movie from "../../Component/movie";

// SSR network에 api url이 노출되지 않음. usestate의 훅 사용 필요 없음
export const metadata = {
    title : "home",
}

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies"

// ssr이라 db와 직접 통신해도 안전함
// strema으로 순차적으로 전송 layout, navigation -> loading component -> backend작업 종료 -> page 렌더링
async function getMovies(){
    // return fetch(URL).then(response => response.json());
    // 백엔드에서 대기. 이 전에는 프론트 엔드에서 대기라 기본 html 출력 후, fetch데이터 출력
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = fetch(API_URL);
    const json = (await response).json();
    return json;
}

// async해야 await할수 있음
export default async function HomePage() {
    console.log("fetching");
    const movies = await getMovies();
    return (
        <div className={styles.container}>
            {movies.map((movie) => (
                <Movie key={movie.id} id={movie.id} 
                title={movie.title} poster_path={movie.poster_path}></Movie>
            ))}
        </div>
    )
}

// 네트워크 탭에 api url 노출, usestate등의 훅 사용 필요
// "use client"
// import { useEffect, useState } from "react"

// export default function Tomata() {
//     const [isLoading, setIsLoading] = useState(true);
//     const [movies,setMovies] = useState();
//     const getMovies = async () => {
//         const response = fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
//         const json = await (await response).json();
//         setMovies(json);
//         setIsLoading(false);
//     }
//     useEffect(() => {
//         if(isLoading === true){
//             getMovies();
//         }
        
//     })
//     return (
//         <div>
//             {isLoading ? "Loading...." : JSON.stringify(movies)}
//         </div>
//     )
// }