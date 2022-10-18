import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { ChangeEvent, useState } from 'react';



export default function saveImgTest () {
    const [imagem, setImagem] = useState(null);
   

    const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("From onFileUploadChange");
      };
      const onUploadFile = async (e) => {
        e.preventDefault();
        console.log(imagem);
        try {
          let formData = new FormData();
          formData.append("media", imagem);
            
          const res = await fetch("http://localhost:3000/api/uploads", {
            method: "POST",
            body: formData,
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
                <Button onClick={onUploadFile} type='submit' variant='contained'>Submit</Button>
            </form>
            </Container>
        </>
    )
}