export default async function Movie({
    params: {id},
} : {
    params: {id: string};
}) {
    
    return <h1>Movie,{id}</h1>
}