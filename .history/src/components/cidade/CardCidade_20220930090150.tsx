import Link from "next/link";


export default function CardCidade({descricao, destino}){
    return(
        <div className="card2" >
            <Link href={destino}>
                <div className="titulocard2">
                    <h4>{descricao}</h4>
                </div>
            </Link>
        </div>
    )
}