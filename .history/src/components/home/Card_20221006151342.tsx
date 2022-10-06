import { Button } from "@mui/material";
import Link from "next/link";


export default function Card({descricao, destino}){
    return(
        <Button className="card" >
            <Link href={destino}>
                <div className="titulocard">
                    <h3>{descricao}</h3>
                </div>
            </Link>
        </Button>
    )
}