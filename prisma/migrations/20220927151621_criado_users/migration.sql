-- CreateTable
CREATE TABLE "user" (
    "idkey" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("idkey")
);
