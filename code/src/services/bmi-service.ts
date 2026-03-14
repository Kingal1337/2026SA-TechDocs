// code/src/services/bmi-service.ts

// calculate BMI using height in inches and weight in pounds
export function calculateBmi(height: number, weight: number): number {
  // prevent divide by zero or invalid values
  if (!height || !weight || height <= 0 || weight <= 0) {
    return 0
  }

  // BMI formula for imperial units
  const bmi = (weight / (height * height)) * 703

  // return rounded value for cleaner display
  return Number(bmi.toFixed(1))
}

// basic demo energy score
export function calculateEnergyScore(
  sleepHours: number,
  currentEnergyLevel: number,
  fitnessLevel: string
): number {
  let score = 50

  // sleep adjustment
  if (sleepHours >= 8) {
    score += 20
  } else if (sleepHours >= 6) {
    score += 10
  } else {
    score -= 10
  }

  // current energy level adjustment
  score += Number(currentEnergyLevel || 0) * 3

  // fitness level adjustment
  if (fitnessLevel === "Active") {
    score += 10
  } else if (fitnessLevel === "Moderate") {
    score += 5
  }

  // cap the score between 0 and 100
  if (score > 100) {
    score = 100
  }

  if (score < 0) {
    score = 0
  }

  return score
}