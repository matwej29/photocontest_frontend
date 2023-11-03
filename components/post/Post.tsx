import Image from 'next/image';
import {useEffect, useRef, useState} from "react";
import Commentaries from "@/components/commentaries/Commentaries";

export interface post {
    id: number,
    photo_src: string,
    author: string,
    name: string,
    created_at: string,
    posted_at: string,
    description: string,
}

const PostStyles = {
    display: 'flex',
    boxSizing: 'content-box',
    position: 'relative',
    justifyContent: 'space-between',
    flexDirection: 'line',
    maxWidth: '33vw',
    padding: '30px',
    width: '100%',
    height: '100%',

    borderRadius: '20px',
    border: '1px solid gray',
}

const PostImageStyles = {
    objectFit: 'contain'
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
            fetch(`http://localhost:8000/api/commentaries/${id}`).then(
                (response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Network fetch failed.");
                    }
                }
            ).then(response_data => setCommentaries(response_data.commentaries))
                .catch((e) => console.error(e));
        }
    }, []);

    return (<div style={PostStyles}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <p>Post</p>
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                    <Image src={"http://localhost:8000" + photo_src}
                           alt={photo_src} fill style={PostImageStyles} ref={imageRef}/>
                </div>
                <div>
                    <p>{photo_src}</p>
                    <p>{author}</p>
                    <p>{name}</p>
                    <p>{created_at}</p>
                    <p>{posted_at}</p>
                    <p>{description}</p>
                </div>
            </div>
            <Commentaries commentaries={commentaries}/>
        </div>
    );
}


export default Post;
