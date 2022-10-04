import Link from "next/link";


export default function Card({descricao, destino}){
    return(
        <>
            <Link className="card" href={destino}>
                <div>
                    <h2>{descricao}</h2>
                </div>
            </Link>
        </>
    )
}