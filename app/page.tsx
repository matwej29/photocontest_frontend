"use client";
import {doQuery} from "@/api/api";
import styles from "./page.module.css";
import Menu from "@/components/menu/Menu";
import Post from "@/components/post/Post";
import {useEffect, useState} from "react";

export default function Home() {
    let [data, setData] = useState(null);
    let [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        doQuery({path: "api/posts", method: "GET", data: {}})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network fetch failed.");
                }
            })
            .then((response_data) => setData(response_data.posts))
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        doQuery({path: "api/is_authorized", method: "POST", data: {}})
            .then((response) => {
                if (response.ok) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            })
            .catch((e) => console.error(e));
    }, []);

    return (
        <main className={styles.main}>
            <Menu/>
            {data ? (
                data.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        photo_src={post.photo}
                        author={post.author}
                        name={post.name}
                        created_at={post.created_at}
                        posted_at={post.posted_at}
                        description={post.description}
                    />
                ))
            ) : (
                <p>Fetching...</p>
            )}

        </main>
    );
}
