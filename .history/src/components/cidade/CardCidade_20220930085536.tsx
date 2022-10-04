import Link from "next/link";


export default function CardCidade({descricao, destino}){
    return(
        <div className="cardCidade" >
            <Link href={destino}>
                <div className="titulocard">
                    <h2>{descricao}</h2>
                </div>
            </Link>
        </div>
    )
}