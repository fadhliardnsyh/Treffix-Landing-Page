export function getSocialImageUrl(imagePath: string) {
  if (imagePath === "/og-cover.jpg") return "/social/og-cover.jpg";

  const imageName = imagePath.split("/").pop()?.replace(/\.(?:jpe?g|png|webp)$/i, "") ?? "image";
  const group = imagePath.startsWith("/customer-photos/") ? "customer" : "article";
  const basename = group === "article" ? imageName.replace(/^article-/, "") : imageName;
  return `/social/${group}-${basename}.jpg`;
}
