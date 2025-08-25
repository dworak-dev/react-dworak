/*
 * This file is used to add the necessary type declarations for importing image files in TypeScript.
 * Without these delcarations TypeScript will complain when importing image files like such:
 * import logo from './logo.png';
 * I feel like it should be possible to do this by adding some settings to tsconfig.json but I couldn't figure it out.
 * Works good enogugh for now.
 * dworak.dev
 */

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}
declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.tiff" {
  const content: string;
  export default content;
}
