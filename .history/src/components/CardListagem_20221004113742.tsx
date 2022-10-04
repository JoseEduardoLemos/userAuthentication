import { Button } from "@mui/material";
import Link from "next/link";


export default function CardListagem({descricao, destino}){
    return(
        <Link href={destino}>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{descricao}</h3>
                    <Button>&#128465;</Button>
                </div>
            
        </div>
        </Link>
    )
}