import {useEffect, useState} from "react";

interface commentary {
    id: number,
    post: number,
    author: number,
    value: string,
}

const CommenatiresStyles = {
    display: 'flex',
    flexDirection: 'column'
}


const Commentaries = ({commentaries = []}: { commentaries: commentary[] }) => {
    const [commentariesList, setCommentariesList] = useState(commentaries);

    useEffect(() => {
        setCommentariesList(commentaries);
    }, [commentaries]);

    return (<div>
        <p>Commentaries</p>
        <ul>
            {commentariesList.map((commentary: commentary) => (
                <li key={commentary.id}>
                    <p>{commentary.value}</p>
                </li>
            ))}
        </ul>
    </div>);
}

export default Commentaries;
