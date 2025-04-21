import { Metadata } from "next"
import Navigation from "../Component/navigation"

export const metadata : Metadata = {
    title : "Not Found"
}
export default function NotFound(){
    return (
            <div>
                <Navigation />
                <h1>404 Not Found</h1>
            </div>
        )
}