import { Metadata } from "next"
import Navigation from "../Component/navigation"

export const metadata: Metadata = {
    title: "Not Found",

}
export default function NotFound() {
    return (
        <div>
            <Navigation />
            <h1>404 - 페이지를 찾을 수 없습니다.</h1>
            <p>잘못된 경로로 접근하셨습니다.</p>
        </div>
    )
}