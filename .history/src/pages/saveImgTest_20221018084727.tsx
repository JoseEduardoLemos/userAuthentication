import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { ChangeEvent, useState } from 'react';



export default function saveImgTest () {
    const [imagem, setImagem] = useState(null);
   

    const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("From onFileUploadChange");
      };

    return(
        <>
            <Container>
            <form action='/api/uploads' encType='multipart/form-data' onSubmit={e =>{
                e.preventDefault()
            }}>
                <input
                    type="file"
                    multiple
                    id ='file'
                    name="image"
                    accept=".jpeg, .jpg, .png"
                    required
                    onChange={onFileUploadChange}
                />
                <Button type='submit' variant='contained'>Submit</Button>
            </form>
            </Container>
        </>
    )
}