import Image from 'next/image';
import {useEffect, useRef, useState} from "react";
import Commentaries from "@/components/commentaries/Commentaries";
import {doQuery} from "@/api/api";

import styles from './Post.module.css';

export interface post {
    id: number,
    photo_src: string,
    author: string,
    name: string,
    created_at: string,
    posted_at: string,
    description: string,
}


const Post = ({id, photo_src = '', author = '', name = '', created_at = '', posted_at = '', description = ''}: post) => {
    const imageRef = useRef();

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.style = {...imageRef.current.style, position: 'relative'};
        }
    }, []);

    const [commentaries, setCommentaries] = useState([]);

    useEffect(() => {
        if (id) {
            doQuery({path: `api/commentaries/${id}`, method: "GET", data: {}})
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Network fetch failed.");
                    }
                })
                .then(response_data => setCommentaries(response_data.commentaries))
                .catch((e) => console.error(e));
        }
    }, []);

    return (<div className={styles.post}>
            <p>{name}</p>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <p>Post</p>
                <div style={{position: 'relative', width: '300px', height: '300px', overflow: "hidden"}}>
                    <Image src={"http://localhost:8000" + photo_src}
                           alt={photo_src} fill style={{objectFit: 'contain', objectPosition: "center"}} ref={imageRef}
                           sizes={"30vw"}
                           className={styles.image}
                           quality={1}/>
                </div>
                <div>
                    {/*<p>{photo_src}</p>*/}
                    <p>author id: {author}</p>
                    {/*<p>{created_at}</p>*/}
                    {/*<p>{posted_at}</p>*/}
                    <p>{description}</p>
                </div>
            </div>
            <Commentaries commentaries={commentaries} postId={id}/>
        </div>
    );
}


export default Post;
