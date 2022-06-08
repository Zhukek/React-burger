const sort = (list) => {
    const buns = [];
    const sauces = [];
    const main = [];
    buns.push(...list.filter((ingridient) => ingridient.type === "bun"));
    sauces.push(...list.filter((ingridient) => ingridient.type === "sauce"));
    main.push(...list.filter((ingridient) => ingridient.type === "main"));
    return [buns, sauces, main]
}

export default sort