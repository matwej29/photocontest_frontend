import React from "react";
import {useRouter} from "next/navigation";
import {doQuery} from "@/api/api";

import styles from "./loginForm.module.css";

const LoginForm = () => {
    const [email, setEmail] = React.useState("");
    const router = useRouter();

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        doQuery({path: "api/login", data: {email: email}, method: "POST"})
            .then((response) =>
                response.json().then((data) => {
                    router.push(
                        `http://localhost:3000/verify_login/?email=${email}&registration_token=${data.registration_token}`
                    );
                })
            )
            .catch((e) => console.error(e));
    };

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <input
                className={styles.input}
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" className={styles.button}/>
        </form>
    );
};

export default LoginForm;
