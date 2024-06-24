'use client'
import LoginForm from "@/components/loginForm/loginForm";

import styles from './page.module.css'

export default function Login() {
    return (
        <main className={styles.main}>
            <h1>login</h1>
            <LoginForm />
        </main>
    )
}

