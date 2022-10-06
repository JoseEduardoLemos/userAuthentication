import Link from "next/link";


export default function NavBar(){

    return(
        <div className="navbar">
            <div className="botoeshome">
                <Link href="/home">
                    <div className="botaohome">
                        <div className="titulonavbar"><h3>Módulos</h3></div>
                    </div>
                </Link>

                <Link href="/localhost:3001">
                    <div className="botaohome">    
                        <div className="titulonavbar"><h3>Planos de Gestão Municipal</h3></div>
                    </div>
                </Link>
                
                <Link href= "/">
                    <div className="botaohome">
                        <div className="titulonavbar"><h3>Sair</h3></div>
                    </div>
                </Link>
            </div>                
        </div>
    )
}