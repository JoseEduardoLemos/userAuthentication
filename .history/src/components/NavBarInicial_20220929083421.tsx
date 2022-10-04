import Link from "next/link";


export default function NavBarInicial(){

    return(
        <div className="navbar">
            <div className="botoeshome2">
                <div className="botaohome">    
                    <Link href="https://localhost:3001">
                        <div className="titulonavbar"><h3>Planos de Gestão Municipal</h3></div>
                    </Link>
                </div>
            </div>                
        </div>
    )
}