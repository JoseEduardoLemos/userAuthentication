import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import NavBar from '../../../components/NavBar';

export default function Cidade({cidade, idCidade}){
  return(
    <div>
      <header>
        <NavBar/>
        <div>
          
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
        idkey : Number(idCidade.idCidade),
      }
    });
    
    return{
      props:{
        cidade,
        idCidade,
      }
    }
}
    
