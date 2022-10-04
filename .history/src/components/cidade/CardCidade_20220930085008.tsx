import Link from "next/link";


export default function Card({descricao, destino}){
    return(
        <div className="card" >
            <Link href={destino}>
                <div className="titulocard">
                    <h2>{descricao}</h2>
                </div>
            </Link>
        </div>
    )
}