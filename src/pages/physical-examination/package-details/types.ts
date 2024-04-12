export interface PackageInfoInter {
  packageName: string;
  tags: Array<string>;
  packageIntro: string;
  preferentialPrice: number;
  originalPrice: number;
  packageDetails: Array<{ itemName: string; itemSignificance: string }>;
}
