'use client'
import React, {useState} from 'react';
import {doQuery} from '@/api/api';
import Menu from "@/components/menu/Menu";

import styles from './page.module.css';

const UploadPost = () => {
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('description', description);
        formData.append('photo', photo);

        try {
            const response = await doQuery({
                path: 'api/create_post',
                method: 'POST',
                data: formData,
            }, false);
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Menu/>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Post description"
                        className={styles.input}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.input}
                        onChange={(e) => {
                            console.log(e.target.files);
                            setPhoto(e.target.files[0]);
                        }}
                        required
                    />
                    <button type="submit" className={styles.button}>Upload Post</button>
                </form>
            </div>
        </div>
    );
};

export default UploadPost;
