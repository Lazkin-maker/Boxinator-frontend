/**
 * Calculates the shipping costs of a shipment
 * @param weight Weight in kilograms that matches its weight tier
 * @param multiplier Country multiplier that is matches its country
 * @returns Total shipping costs of a shipment
 */
function calculateShipping(weight: number, multiplier: number) {
    return 200 + (weight * multiplier);
}

export default calculateShipping
