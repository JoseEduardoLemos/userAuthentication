import { Button } from "@mui/material";
import { Container } from "@mui/system";
import app from "next/app";
import { useState } from 'react';



export default function saveImgTest () {
    const [imagem, setImagem] = useState(null);
    
    
    async function submitForm (data) {
        app.post('/api/uploads')
    }

    return(
        <>
            <Container>
            <form encType='multipart/form-data' onSubmit={e =>{
                e.preventDefault
                submitForm(imagem)
            }}>
                <input
                    type="file"
                    name="image"
                    accept=".jpeg, .jpg, .png"
                    required
                    onChange={(e) => setImagem(e.target.files[0])}
                />
                <Button type='submit' variant='contained'>Submit</Button>
            </form>
            </Container>
        </>
    )
}