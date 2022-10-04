import Link from "next/link";


export default function NavBar(){

    return(
        <div className="navbar">
            <div className="botaohome">
                <Link className="botaohome" href="/home">
                <div className="titulonavbar"><h3>Inicio</h3></div>
                </Link>
                <Link className="botaohome" href="/localhost:3001">
                <div className="titulonavbar"><h3>Planos de Gestão Municipal</h3></div>
                </Link>
            </div>                
        </div>
    )
}