import {
  CarColorName,
  FeatureName,
  Gender,
  PrismaClient,
  RoleName,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

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
        name: RoleName.TRAVELER,
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

  const getRoleTRAVELERId = await prisma.role.findFirst({
    where: {
      name: RoleName.TRAVELER,
    },
  });

  // create accounts test
  const hashPasswordAdmin = await bcrypt.hash('admin01', 10);
  const hashPasswordCarOwner = await bcrypt.hash('carowner', 10);
  const hashPasswordTraveler = await bcrypt.hash('traveler', 10);
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'admin01',
        password: hashPasswordAdmin,
        name: 'Admin Admin',
        email: 'admin@gmail.com',
        phone: null,
        gender: Gender.MALE,
        address: null,
        avatarUrl: null,
        roleId: getRoleAdminId?.id,
      },
      {
        username: 'carowner',
        password: hashPasswordCarOwner,
        name: 'Car Owner',
        email: 'carowner@gmail.com',
        phone: null,
        gender: Gender.FEMALE,
        address: null,
        avatarUrl: null,
        roleId: getRoleCarOwnerId?.id,
      },
      {
        username: 'traveler',
        password: hashPasswordTraveler,
        name: 'Traveler',
        email: 'traveler@gmail.com',
        phone: null,
        gender: Gender.OTHER,
        address: null,
        avatarUrl: null,
        roleId: getRoleTRAVELERId?.id,
      },
    ],
  });

  // // create feature test
  const features = await prisma.feature.createMany({
    data: [
      { name: FeatureName.AIR_CONDITIONING },
      { name: FeatureName.RADIO },
      { name: FeatureName.USB },
      { name: FeatureName.BLUETOOTH },
      { name: FeatureName.GPS },
      { name: FeatureName.PARKING_SENSOR },
      { name: FeatureName.CAMERA },
      { name: FeatureName.SUNROOF },
      { name: FeatureName.KEYLESS },
      { name: FeatureName.ALARM },
      { name: FeatureName.AIRBAG },
      { name: FeatureName.AUTO_BRAKE },
      { name: FeatureName.AUTO_WIPER },
      { name: FeatureName.LANE_KEEPING },
      { name: FeatureName.BLIND_SPOT },
      { name: FeatureName.REAR_TRAFFIC },
      { name: FeatureName.TIRE_PRESSURE },
      { name: FeatureName.KID_SEAT },
    ],
  });

  const carColors = await prisma.carColor.createMany({
    data: [
      { name: CarColorName.BLACK },
      { name: CarColorName.WHITE },
      { name: CarColorName.RED },
      { name: CarColorName.BLUE },
      { name: CarColorName.YELLOW },
      { name: CarColorName.ORANGE },
      { name: CarColorName.GREEN },
      { name: CarColorName.PURPLE },
      { name: CarColorName.PINK },
      { name: CarColorName.BROWN },
      { name: CarColorName.GREY },
    ],
  });

  console.log({ roles, users, features, carColors });
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
