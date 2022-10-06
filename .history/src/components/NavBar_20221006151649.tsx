import { Button } from "@mui/material";
import Link from "next/link";

export default function NavBar(){

    return(
        <div className="navbar">
            <div className="botoeshome">
                <Link href="/home">
                    <Button className="botaohome">
                        <div className="titulonavbar"><h3>Módulos</h3></div>
                    </Button>
                </Link>

                <Link href="/localhost:3001">
                    <Button className="botaohome">    
                        <div className="titulonavbar"><h3>Planos de Gestão Municipal</h3></div>
                    </Button>
                </Link>
                
                <Link href= "/">
                    <Button className="botaohome">
                        <div className="titulonavbar"><h3>Sair</h3></div>
                    </Button>
                </Link>
            </div>                
        </div>
    )
}