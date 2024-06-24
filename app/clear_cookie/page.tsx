"use client"
import {useRouter} from "next/navigation";
import {doQuery} from "@/api/api";

export default function ClearCookie() {
    const router = useRouter();

    doQuery({path: "api/clear_cookie", method: "POST", data: {}})
        .then((response) => {
            if (response.ok) {
                router.push("/");
            } else {
                throw new Error("Network fetch failed.");
            }
        })
        .catch((e) => console.error(e));

    return (
        <main>
            <h1>Clearing cookie...</h1>
        </main>
    );
}
