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
    console.log(idCidade);

    const prisma = new PrismaClient();
    const cidade = await prisma.cidade.findUnique({
      where:{
        idkey : 1,
      }
    });
    
    return{
      props:{
        cidade,
      }
    }
}
    

