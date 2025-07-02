-- CreateTable
CREATE TABLE "UserClient" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserClient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserClient_userId_clientId_key" ON "UserClient"("userId", "clientId");

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
