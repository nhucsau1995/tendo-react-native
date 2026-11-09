// Every entry of assets/images.json, bundled locally (no remote URLs).
export const images = {
  welcomeHero: require('../../assets/images/welcome-hero.jpg'),
  promoSupplies: require('../../assets/images/promo-supplies.jpg'),
  coverKitchen: require('../../assets/images/cover-kitchen.jpg'),
  workBathroom: require('../../assets/images/work-bathroom.jpg'),
  workLiving: require('../../assets/images/work-living.jpg'),
  workOven: require('../../assets/images/work-oven.jpg'),
  emptyEntryway: require('../../assets/images/empty-entryway.jpg'),
  mariaPortrait: require('../../assets/images/maria-portrait.jpg'),
  jamesPortrait: require('../../assets/images/james-portrait.jpg'),
  avatarMaria: require('../../assets/images/avatar-maria.jpg'),
  avatarJames: require('../../assets/images/avatar-james.jpg'),
  avatarAisha: require('../../assets/images/avatar-aisha.jpg'),
  avatarDaniel: require('../../assets/images/avatar-daniel.jpg'),
  avatarSofia: require('../../assets/images/avatar-sofia.jpg'),
  avatarEmma: require('../../assets/images/avatar-emma.jpg'),
  avatarNoah: require('../../assets/images/avatar-noah.jpg'),
  avatarLiam: require('../../assets/images/avatar-liam.jpg'),
};

export type ImageKey = keyof typeof images;
