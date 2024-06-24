import styles from './Menu.module.css';
import Link from "next/link";
import {useEffect, useState} from "react";
import {doQuery} from "@/api/api";

const Menu = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        doQuery({path: "api/is_authorized", method: "GET", data: {}})
            .then((response) => {
                    if (response.ok) {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                }
            )
            .catch((e) => console.error(e));
    }, []);

    return (
        <div className={styles.menu}>
            <Link href={"/"}>Главная</Link>
            {!isAuthorized ?
                <Link href="/login">Войти</Link> :
                <Link href="/my_page">Моя страница</Link>}
        </div>
    );
}

export default Menu;
