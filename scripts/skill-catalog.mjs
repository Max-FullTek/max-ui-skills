const sharedComponentRecipes = Object.freeze([
  ["Alert", "alert"],
  ["Button", "button"],
  ["Card", "card"],
  ["ControlCard", "control-card"],
  ["DataTable", "table"],
  ["Dialog", "dialog"],
  ["Field", "field"],
  ["Header", "header"],
  ["Heading", "heading"],
  ["ImageCard", "image-card"],
  ["Menubar", "menubar"],
  ["ToastProvider", "toast"],
  ["VisionStage", "vision-stage"],
]);

const sharedLayoutRecipes = Object.freeze([["DashboardFrame", "dashboard-frame"]]);

export const skillCatalog = Object.freeze({
  shared: Object.freeze({
    componentRecipes: sharedComponentRecipes,
    layoutRecipes: sharedLayoutRecipes,
  }),
  themes: Object.freeze({
    "orange-matters": Object.freeze({
      displayName: "Orange Matters",
      componentOverrides: Object.freeze([]),
      layoutOverrides: Object.freeze([]),
      extraReferences: Object.freeze([]),
      opaqueMedia: Object.freeze({
        reference: null,
        files: Object.freeze([]),
      }),
      exclusiveComponents: Object.freeze([
        Object.freeze({
          asset: "RunningBorder",
          recipe: "running-border",
          source: "theme-components/RunningBorder",
          recipeSource: "references/components/running-border.md",
        }),
      ]),
    }),
    "green-ink": Object.freeze({
      displayName: "Green Ink",
      componentOverrides: Object.freeze([
        Object.freeze({ asset: "Button", source: "component-overrides/components/Button/Button.theme.scss" }),
        Object.freeze({ asset: "Dialog", source: "component-overrides/components/Dialog/Dialog.theme.scss" }),
        Object.freeze({ asset: "Field", source: "component-overrides/components/Field/Field.theme.scss" }),
        Object.freeze({ asset: "Header", source: "component-overrides/components/Header/Header.theme.scss" }),
        Object.freeze({ asset: "Heading", source: "component-overrides/components/Heading/Heading.theme.scss" }),
        Object.freeze({ asset: "ImageCard", source: "component-overrides/components/ImageCard/ImageCard.theme.scss" }),
        Object.freeze({ asset: "Menubar", source: "component-overrides/components/Menubar/Menubar.theme.scss" }),
        Object.freeze({ asset: "ToastProvider", source: "component-overrides/components/ToastProvider/ToastProvider.theme.scss" }),
        Object.freeze({ asset: "VisionStage", source: "component-overrides/components/VisionStage/VisionStage.theme.scss" }),
      ]),
      layoutOverrides: Object.freeze([
        Object.freeze({
          asset: "DashboardFrame",
          source: "component-overrides/layouts/DashboardFrame/DashboardFrame.theme.scss",
        }),
      ]),
      extraReferences: Object.freeze(["references/theme-guardrails.md"]),
      opaqueMedia: Object.freeze({
        reference: "references/art-assets.md",
        files: Object.freeze([
          "dark-ink-flow.webp",
          "dry-brush.webp",
          "ink-horizon.webp",
          "paper-grain.webp",
        ]),
      }),
      exclusiveComponents: Object.freeze([]),
    }),
  }),
});

export function getThemeConfig(name) {
  const theme = skillCatalog.themes[name];
  if (!theme) {
    throw new Error(`Unknown theme "${name}". Expected one of: ${Object.keys(skillCatalog.themes).join(", ")}`);
  }
  return { name, ...theme };
}

export function listThemeConfigs() {
  return Object.keys(skillCatalog.themes).map(getThemeConfig);
}

export function componentRecipesFor(theme) {
  return [
    ...skillCatalog.shared.componentRecipes,
    ...theme.exclusiveComponents.map(({ asset, recipe }) => [asset, recipe]),
  ];
}

export function layoutRecipesFor() {
  return [...skillCatalog.shared.layoutRecipes];
}
