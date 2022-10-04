import Link from "next/link";


export default function CardCidade({descricao, destino}){
    return(
        <div className="card2" >
            <Link href={destino}>
                <div className="titulocard2">
                    <h3>{descricao}</h3>
                </div>
            </Link>
        </div>
    )
}