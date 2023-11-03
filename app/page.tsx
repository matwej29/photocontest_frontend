'use client'
import styles from './page.module.css'
import Post from "@/components/post/Post";
import {useEffect, useState} from 'react';


export default function Home() {
    let [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/posts/latest").then(
            (response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Network fetch failed.");
                }
            }
        )
            .then(response_data => setData(response_data))
            .catch((e) => console.error(e));
    }, []);

    return (
        <main className={styles.main}>
            {/*<p>something</p>*/}
            {data ? (
                <Post id={data.latest_post.id} photo_src={data.latest_post.photo} author={data.latest_post.author}
                      name={data.latest_post.name}
                      created_at={data.latest_post.created_at}
                      posted_at={data.latest_post.posted_at} description={data.latest_post.description}/>) : (
                <p>Fetching...</p>)}
        </main>
    )
}
