import { Button } from "@mui/material";
import Link from "next/link";


import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function CardListagem({descricao, destino}){
    return(
        <Link href={destino}>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{descricao}</h3>
                    <div>
                        <Button><DeleteForeverIcon/></Button>
                        
                    </div>
                    
                </div>
            
        </div>
        </Link>
    )
}