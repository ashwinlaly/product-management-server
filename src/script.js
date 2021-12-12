const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.findFirst({
        where : {
            email : "ashwin@gmail.com"
        }
    })
    console.log(user.email)
}

main().catch(e => {
    throw e
}).finally(async () => {
    await prisma.$disconnect()
})