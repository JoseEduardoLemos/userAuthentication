import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from 'react';



export default function saveImgTest () {
    const [imagem, setImagem] = useState(null);
    

    async function submitForm(){
        try{
          const res = await fetch("http://localhost:3000/api/", {
            method: "POST",
            body: imagem,
          });   
      
          const {
            data,
            error,
          }: {
            data: {
              url: string | string[];
            } | null;
            error: string | null;
          } = await res.json();
          
          if (!data) {
            alert(error || "Sorry! something went wrong.");
            return;
          }
      
          console.log("File was uploaded successfylly:", data);
        } catch (error) {
          console.error(error);
          alert("Sorry! something went wrong.");
        }
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
                    onChange={(e) => setImagem(e.target.files[0])}
                />
                <Button onClick={submitForm} type='submit' variant='contained'>Submit</Button>
            </form>
            </Container>
        </>
    )
}