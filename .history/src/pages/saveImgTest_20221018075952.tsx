import { Container } from "@mui/system";
import { useState } from 'react';



export default function saveImgTest () {
    const [imagem, setImagem] = useState(null);
    
    
    async function submitForm (data) {
        try{
            fetch('http://localhost/api/cidades/saveImgOnbucket',{
                body : JSON.stringify(data),

                headers: {
                    'Content-type' : 'application/json'
                },
                method : 'POST'
            })
            .then(() =>{
                setImagem(null);
            })
        }catch (error){
            console.log(error);
        }
    }

    return(
        <>
            <Container>
            <form onSubmit={e =>{
                e.preventDefault
                submitForm(imagem)
            }}>
                <input
                    type="file"
                    accept=".jpeg, .jpg, .png"
                    required
                    onChange={(e) => setImagem(e.target.files[0])}
                />
            </form>
            </Container>
        </>
    )
}