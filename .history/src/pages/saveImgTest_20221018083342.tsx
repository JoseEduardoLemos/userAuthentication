import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from 'react';



export default function saveImgTest () {
    const [imagem, setImagem] = useState(null);
   

    const form = document.getElementById("form");

        form.addEventListener("submit", submitForm);

        function submitForm(e) {
            e.preventDefault();
            const file = document.getElementById("file");
            const formData = new FormData();
            formData.append("imagem", file.files)
            
            fetch("http://localhost:3000/api/uploads", {
                method: 'POST',
                body: formData,
                headers: {
                "Content-Type": "multipart/form-data"
                }
            })
            .then((res) => console.log(res))
        }

    return(
        <>
            <Container>
            <form action='/api/uploads' encType='multipart/form-data' onSubmit={e =>{
                e.preventDefault
                submitForm(imagem)
            }}>
                <input
                    type="file"
                    id ='file'
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