const countryMultipliers = new Map<string, number>([
    ['Sweden', 0],
    ['Norway', 0],
    ['Denmark', 0],
    ['Finland', 0],
    ['Iceland', 10],
    ['Estonia', 3.5],
    ['Latvia', 3.5],
    ['Lithuania', 3.5],
    ['Poland', 5],
    ['Germany', 5],
    ['France', 6],
    ['Spain', 6.5],
    ['Portugal', 6.5],
    ['Italy', 7],
    ['Austria', 6],
    ['Switzerland', 6],
    ['Netherlands', 5],
    ['Belgium', 5],
    ['United Kingdom', 7.5],
    ['Ireland', 7.5],
]);

// import Countries from "../enums/countries";

// const countryMultipliers = new Map<Countries, number>([
//     [Countries.Sweden, 1],
//     [Countries.Norway, 1],
//     [Countries.Denmark, 1],
//     [Countries.Finland, 1],
//     [Countries.Iceland, 10],
//     [Countries.Estonia, 3.5],
//     [Countries.Latvia, 3.5],
//     [Countries.Lithuania, 3.5],
//     [Countries.Poland, 5],
//     [Countries.Germany, 5],
//     [Countries.France, 6],
//     [Countries.Spain, 6.5],
//     [Countries.Portugal, 6.5],
//     [Countries.Italy, 7],
//     [Countries.Austria, 6],
//     [Countries.Switzerland, 6],
//     [Countries.Netherlands, 5],
//     [Countries.Belgium, 5],
//     [Countries.UnitedKingdom, 7.5],
//     [Countries.Ireland, 7.5],
// ]);

//     {
//     Sweden = 1,
//     Norway = 1,
//     Denmark = 1,
//     Finland = 1,
//     Iceland = 10,
//     Estonia = 3.5,
//     Latvia = 3.5,
//     Lithuania = 3.5,
//     Poland = 5,
//     Germany = 5,
//     France = 6,
//     Spain = 6.5,
//     Portugal = 6.5,
//     Italy = 7,
//     Austria = 6,
//     Switzerland = 6,
//     Netherlands = 5,
//     Belgium = 5,
//     UnitedKingdom = 7.5,
//     Ireland = 7.5,
// }

export default countryMultipliers;