import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import NavBar from '../../../components/NavBar';

export default function Cidade({cidade, idCidade}){
  return(
    <div>
      <header>
        <NavBar/>
        <div>
          {cidade.nome}
          {console.log(idCidade)}
        </div>
      </header>
      <br></br>


    </div> 
  )
}

  export const getServerSideProps: GetServerSideProps = async (Router) =>{
    const idCidade = Router.query;  

    const prisma = new PrismaClient();
    const cidade = await prisma.cidade.findUnique({
      where:{
        idkey : 1,
      }
    });
    
    return{
      props:{
        cidade,
        idCidade,
      }
    }
}
    

