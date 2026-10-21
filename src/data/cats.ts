import { parseCatDescription } from "../utils/cat-description";

const descriptions = import.meta.glob<string>("../cats/*/desc{,.txt}", {
  eager: true,
  query: "?raw",
  import: "default",
});
const photos = import.meta.glob<string>(
  "../cats/*/photos/*.{jpeg,jpg,png,webp,avif,JPEG,JPG,PNG,WEBP,AVIF}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

export function loadCats() {
  const cats = Object.entries(descriptions)
    .map(([path, description]) => {
      const directory = path.slice(0, path.lastIndexOf("/"));
      const folder = directory.slice(directory.lastIndexOf("/") + 1);
      const cat = parseCatDescription(description, folder);
      cat.fotos = Object.entries(photos)
        .filter(([photoPath]) => photoPath.startsWith(`${directory}/photos/`))
        .sort(([a], [b]) => a.localeCompare(b, "pt-BR", { numeric: true }))
        .map(([, src], index) => ({
          src,
          alt: `Foto ${index + 1} de ${cat.nome}`,
        }));
      return cat;
    })
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  if (new Set(cats.map((cat) => cat.slug)).size !== cats.length) {
    throw new Error("Há nomes de gatos duplicados em src/cats.");
  }
  return cats;
}
