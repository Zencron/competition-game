export type Vendor = {
  location: number;
  price: number;
  revenue: number;
  lastRoundSales: number;
  lastRoundRevenue: number;
};

export type GameState = {
  round: number;
  maxRounds: number;
  player: Vendor;
  competitor: Vendor;
  customers: [1, 2, 3, 4, 5, 6, 7, 8, 9];
  history: {
    round: number;
    playerRevenue: number;
    competitorRevenue: number;
    playerPrice: number;
    playerLocation: number;
  }[];
  gameOver: boolean;
};

export const INITIAL_GAME_STATE: GameState = {
  round: 1,
  maxRounds: 10,
  player: {
    location: 0,
    price: 5,
    revenue: 0,
    lastRoundSales: 0,
    lastRoundRevenue: 0,
  },
  competitor: {
    location: 10,
    price: 5,
    revenue: 0,
    lastRoundSales: 0,
    lastRoundRevenue: 0,
  },
  customers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  history: [],
  gameOver: false,
};

export type ActionType =
  | "INCREASE_PRICE"
  | "DECREASE_PRICE"
  | "MOVE_LEFT"
  | "MOVE_RIGHT";

export function calculateWillingnessToPay(
  customerLocation: number,
  vendorLocation: number,
): number {
  const distance = Math.abs(customerLocation - vendorLocation);
  // a. $10 if within 1km (distance <= 1)
  // b. Changes by $1 as product moves further away.
  // Interpretation: WTP = 11 - distance.
  // Dist 1: 11 - 1 = 10.
  // Dist 9: 11 - 9 = 2.
  // Dist 6: 11 - 6 = 5.
  // Formula checks out with examples.
  return Math.max(0, 11 - distance);
}

export function processTurn(
  currentState: GameState,
  action: ActionType,
): GameState {
  if (currentState.gameOver) return currentState;

  const newState = structuredClone(currentState);
  const { player, competitor, customers } = newState;

  // 1. Apply Player Action
  switch (action) {
    case "INCREASE_PRICE":
      player.price += 1;
      break;
    case "DECREASE_PRICE":
      player.price = Math.max(0, player.price - 1);
      break;
    case "MOVE_LEFT":
      player.location = Math.max(0, player.location - 1);
      break;
    case "MOVE_RIGHT":
      player.location = Math.min(10, player.location + 1);
      break;
  }

  // Competitor does not move or change price (fixed cost $5, fixed location 10)

  // 2. Calculate Sales
  let playerSales = 0;
  let competitorSales = 0;

  for (const customer of customers) {
    const distToPlayer = Math.abs(customer - player.location);
    const distToCompetitor = Math.abs(customer - competitor.location);

    const wtpPlayer = calculateWillingnessToPay(customer, player.location);
    const wtpCompetitor = calculateWillingnessToPay(
      customer,
      competitor.location,
    );

    const canAffordPlayer = wtpPlayer >= player.price;
    const canAffordCompetitor = wtpCompetitor >= competitor.price;

    // c. Customer will only buy from the nearest vendor.
    // If both vendors are of equal distance, they will buy from neither.
    // ADDITIONALLY: They must be able to afford it (WTP >= Price).

    if (distToPlayer < distToCompetitor) {
      if (canAffordPlayer) {
        playerSales++;
      }
    } else if (distToCompetitor < distToPlayer) {
      if (canAffordCompetitor) {
        competitorSales++;
      }
    } else {
      // Equal distance -> buy from neither
    }
  }

  // 3. Update Revenue
  const playerRoundRevenue = playerSales * player.price;
  const competitorRoundRevenue = competitorSales * competitor.price;

  player.revenue += playerRoundRevenue;
  player.lastRoundSales = playerSales;
  player.lastRoundRevenue = playerRoundRevenue;

  competitor.revenue += competitorRoundRevenue;
  competitor.lastRoundSales = competitorSales;
  competitor.lastRoundRevenue = competitorRoundRevenue;

  // 4. Update History
  newState.history.push({
    round: newState.round,
    playerRevenue: player.revenue,
    competitorRevenue: competitor.revenue,
    playerPrice: player.price,
    playerLocation: player.location,
  });

  // 5. Advance Round
  if (newState.round >= newState.maxRounds) {
    newState.gameOver = true;
  } else {
    newState.round++;
  }

  return newState;
}
