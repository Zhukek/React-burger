import { TIngredient } from "./types/data";

const sort = (list: TIngredient[]) => {
    const buns: TIngredient[] = [];
    const sauces:TIngredient[] = [];
    const main: TIngredient[] = [];
    buns.push(...list.filter((ingridient) => ingridient.type === "bun"));
    sauces.push(...list.filter((ingridient) => ingridient.type === "sauce"));
    main.push(...list.filter((ingridient) => ingridient.type === "main"));
    return {buns: buns, sauces: sauces, main: main}
}

export default sort