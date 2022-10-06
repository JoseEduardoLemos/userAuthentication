import { PrismaClient } from "@prisma/client";



export async function getServerSideProps() {
    const prisma = new PrismaClient();

    return {
        props: {
            plano,
            cidade
        }
    };
}
