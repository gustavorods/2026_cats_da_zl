import { loadCats } from "../data/cats";
import type { Cat } from "../types/cat";
/** Substitua apenas esta implementação ao integrar a API. */
export const catsService = {
  async list(): Promise<Cat[]> {
    return loadCats();
  },
};
