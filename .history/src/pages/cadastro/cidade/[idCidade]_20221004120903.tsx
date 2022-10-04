import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import NavBar from '../../../components/NavBar';

export default function Cidade({cidade}){
  return(
    <div>
      <header>
        <NavBar/>
        <div>
          {cidade.map(cidade =>{
            return(
              <h2>{cidade.nome} id {cidade.idkey}</h2>
          )})
          }
        </div>
      </header>
      <br></br>


    </div> 
  )
}

  export const getServerSideProps: GetServerSideProps = async (Router) =>{
    const idCidade = Router.query;  
    
    const prisma = new PrismaClient();
    const cidade = await prisma.cidade.findFirst({
      where:{
        idkey : Number(idCidade.id),
      }
    });
    
    return{
      props:{
        cidade,
      }
    }
}
    

