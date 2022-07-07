// get H from hsl for grouping
export const createBaseColorH = (amount: number, baseColor: number) => {
  let result: number[] = [];
  const increment = Math.floor(360 / amount);
  for (let i = 0; i < amount; i++) {
    result.push(baseColor + i * increment);
  }
  return result;
};

// create needed amounts of close by groups
export const createColorGroupsHSLFromH = (h: number[], amount: number) => {
  const result: { [key: number]: number[][] } = {};
  const maxNearbyColorRange = 360 / h.length / 2;
  const generateFiveCloseColors = (h: number) => {
    return [
      [h, 50, 50],
      [h, 80, 50],
      [h, 30, 50],
      [h, 50, 80],
      [h, 50, 30],
    ];
  };
  const steppedColorRange = Math.min((maxNearbyColorRange * 5) / amount, 15);
  for (let i = 0; i < h.length; i++) {
    result[i] = generateFiveCloseColors(h[i]);
    let steppedIncrease = steppedColorRange;
    while (result[i].length < amount) {
      result[i] = [
        ...generateFiveCloseColors(h[i] - steppedIncrease),
        ...result[i],
        ...generateFiveCloseColors(h[i] + steppedIncrease),
      ];
      steppedIncrease += steppedColorRange;
    }
  }
  return result;
};

// create color groups
export const createColorGroups = (
  numOfGroups: number,
  maxNumOfMembersInGroup: number,
  baseColor: number = 200
) =>
  createColorGroupsHSLFromH(
    createBaseColorH(numOfGroups, baseColor),
    maxNumOfMembersInGroup
  );
