import {useEffect, useState} from "react";
import {doQuery} from "@/api/api";

import styles from './Commentaries.module.css';


interface commentary {
    id: number,
    post: number,
    author: number,
    value: string,
}


const Commentaries = ({commentaries = [], postId}: { commentaries: commentary[], postId: number }) => {
    const [commentariesList, setCommentariesList] = useState(commentaries);
    const [authorized, setAuthorized] = useState(false);

    const handleSumbit = (e) => {
        e.preventDefault();
        const value = e.target[0].value;
        doQuery({path: "api/add_commentary", method: "POST", data: {"value": value, "post_id": postId}})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network fetch failed.");
                }
            })
            .then((response_data) => {
                e.target[0].value = "";
                setCommentariesList([...commentariesList, response_data.commentary]);
            })
            .catch((e) => console.error(e));
    }

    useEffect(() => {
        setCommentariesList(commentaries);
    }, [commentaries]);

    useEffect(() => {
        doQuery({path: "api/is_authorized", method: "POST", data: {}})
            .then((response) => {
                if (response.ok) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            })
            .catch((e) => console.error(e));
    }, []);

    return (<div className={styles.block}>
        <p>Commentaries</p>
        <div className={styles.container}>
            <ul>
                <div></div>
                {commentariesList.map((commentary: commentary) => (
                    <li key={commentary.id}>
                        <p>author_{commentary.author}: {commentary.value}</p>
                    </li>
                ))}
            </ul>
            {authorized ? <form onSubmit={(e) => handleSumbit(e)}>
                <input className={styles.input} type="text"/>
                <input className={styles.button} type="submit"/>
            </form> : <p>Log in to comment</p>}
        </div>
    </div>);
}

export default Commentaries;
