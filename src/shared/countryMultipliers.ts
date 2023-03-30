/**
 * Map to convert country name to multiplier.
 * Can be used to calculate the price of a product in a specific country
 */
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

export default countryMultipliers;