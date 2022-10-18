import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from 'react';


export default function saveImgTest () {
    const [imagem, setImagem] = useState(null);
    

    async function submitForm(data){
        console.log(imagem)
        try{
            fetch("http://localhost:3000/api/cidades/saveImgOnbucket", {
            method: "POST",
            body: imagem,
          })  
        } catch (error) {
          console.error(error);
          alert("Sorry! something went wrong.");
        }   
      };

    return(
        <>
            <Container>
            <form action='/api/cidades/saveImgOnbucket' encType='multipart/form-data' method='POST'>
                <input
                    type="file"
                    multiple
                    id ='file'
                    name="image"
                    accept=".pdf"
                    required
                />
                <Button type='submit' variant='contained'>Submit</Button>
            </form>
            </Container>
        </>
    )
}