import Link from "next/link";


export default function Card({descricao}){
    return(
        <>
            <Link href=''>
                <div>
                    <h2>{descricao}</h2>
                </div>
            </Link>
        </>
    )
}