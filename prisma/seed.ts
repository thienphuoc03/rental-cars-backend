import { PrismaClient, RoleName } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      {
        name: RoleName.ADMIN,
      },
      {
        name: RoleName.CAROWNER,
      },
      {
        name: RoleName.CUSTOMER,
      },
    ],
  });

  console.log({ roles });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
