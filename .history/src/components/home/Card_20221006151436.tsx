import { Button } from "@mui/material";
import Link from "next/link";


export default function Card({descricao, destino}){
    return(
        <Link href={destino}>
            <Button className="card" >
                <div className="titulocard">
                    <h3>{descricao}</h3>
                </div>
            </Button>
        </Link>
    )
}