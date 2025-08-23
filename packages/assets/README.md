# React Dworak - Assets

This package contains various assets used in the React Dworak project, including images, icons, and other media files.
This is the suggested way to manage and organize the assets for several reasons:

- **Shared assets**: It is very common for multiple apps in a monorepo to share the same assets such as logos and icons. You usually have to replicate assets between the different apps public folders, which can lead to inconsistencies and increased maintenance effort. By centralizing assets in a single package, you ensure that all apps use the same version of each asset, reducing duplication and potential errors.
- **Typing**: By exporting assets from a package, you can leverage TypeScript's type checking capabilities. This helps catch errors at compile time, such as incorrect file paths or missing assets, improving the overall reliability of your codebase. If a file is removed, or renamed, TypeScript will raise an error in all the places where that asset is used.

### Adding new assets

Adding more assets is as easy as adding the file to the `src` folder and exporting it in the `src/index.ts` file. For example, if you add a new image called `new-image.png`, you would do the following:

1. Place `new-image.png` in the `src` folder.
2. Open `src/index.ts` and add the following line:

```typescript
export { default as NewImage } from "./new-image.png";
```

### Using assets in your app

To use an asset in your app, you can import it from the local `@packages/assets` package.

> [!IMPORTANT]  
> Make sure to install the package in your project if you haven't done so already by adding it to your `package.json`:

```json
"dependencies": {
  "@packages/assets": "*",
}
```

For example, to use the `NewImage` asset, you would import it like this:

```typescript
import { NewImage } from "@packages/assets";
```

And then use it like this:

```typescript
<img src={NewImage} alt="New Image" />;
<div
  style={{
    width: 100,
    height: 100,
    backgroundImage: `url(${ExampleImage.src})`,
  }}
/>
```
