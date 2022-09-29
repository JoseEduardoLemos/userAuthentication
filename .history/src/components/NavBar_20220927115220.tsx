import Link from "next/link";


export default function NavBar(){

    return(
        <Link className="botaonavbar" href='https://google.com'> 
            <div className="navbar">
                    <div className="titulonavbar"><h3>Planos de Gestão Municipal</h3></div>
            </div>
        </Link>
    )
}