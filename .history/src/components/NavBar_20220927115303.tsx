import Link from "next/link";


export default function NavBar(){

    return(
        
            <div className="navbar">
                <Link className="botaonavbar" href='https://google.com'> 
                    <div className="titulonavbar"><h3>Planos de Gestão Municipal</h3></div>
                </Link>
            </div>
        
    )
}