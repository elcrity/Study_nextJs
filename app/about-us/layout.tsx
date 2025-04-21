import { Metadata } from "next"

export default function AboutLayout({ children, }:
    { children: React.ReactNode }) {
    return (
        <div>
            {children}
            &copy; Next Js is Great
        </div>
    )
}
