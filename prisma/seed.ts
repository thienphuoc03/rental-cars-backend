import { Gender, PrismaClient, RoleName } from '@prisma/client';
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

  // get role id in database
  const getRoleAdminId = await prisma.role.findFirst({
    where: {
      name: RoleName.ADMIN,
    },
  });

  const getRoleCarOwnerId = await prisma.role.findFirst({
    where: {
      name: RoleName.CAROWNER,
    },
  });

  const getRoleCustomerId = await prisma.role.findFirst({
    where: {
      name: RoleName.CUSTOMER,
    },
  });

  // create accounts test
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'admin01',
        password: 'admin01',
        name: 'Admin Admin',
        email: 'admin@gmail.com',
        phone: '',
        gender: Gender.MALE,
        address: '',
        avatarUrl: '',
        roleId: getRoleAdminId?.id,
      },
      {
        username: 'carowner',
        password: 'carowner',
        name: 'Car Owner',
        email: 'carowner@gmail.com',
        phone: '',
        gender: Gender.FEMALE,
        address: '',
        avatarUrl: '',
        roleId: getRoleCarOwnerId?.id,
      },
      {
        username: 'customer',
        password: 'customer',
        name: 'Customer',
        email: 'customer@gmail.com',
        phone: '',
        gender: Gender.OTHER,
        address: '',
        avatarUrl: '',
        roleId: getRoleCustomerId?.id,
      },
    ],
  });

  console.log({ roles, users });
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
