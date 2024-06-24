'use client'
import {doQuery} from "@/api/api";
import {useSearchParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

import styles from './page.module.css';


export default function VerifyLogin() {
    const [token, setToken] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const registration_token = searchParams.get('registration_token');

    useEffect(() => {
        if (!email || !registration_token) {
            router.push('/');
        }
    }, [email, registration_token]);


    const handleSubmit = (e) => {
        e.preventDefault();
        doQuery(
            {
                path: 'api/verify_login',
                method: 'POST',
                data: {registration_token: token}
            })
            .then(response => {
                if (response.ok) {
                    router.push('/');
                } else {
                    throw new Error("Network fetch failed.");
                }
            })
            .catch((e) => console.error(e));
    }


    return (
        <div className={styles.container}>
            <h1>Verify Login</h1>
            <p>email: {email}</p>
            <p>registration_token: {registration_token}</p>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <input className={styles.input} type="text" placeholder="registration_token" onChange={(e) => setToken(e.target.value)}/>
                <input className={styles.button} type="submit" value="Submit"/>
            </form>
        </div>
    )
}
