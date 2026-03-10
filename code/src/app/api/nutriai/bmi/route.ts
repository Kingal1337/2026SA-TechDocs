// code/src/app/api/nutriai/bmi/route.ts

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse incoming request body
    const body = await request.json()

    const height = Number(body.height)
    const weight = Number(body.weight)
    const sleepHours = Number(body.sleepHours)
    const currentEnergyLevel = Number(body.currentEnergyLevel)
    const fitnessLevel = body.fitnessLevel

    // Validate required inputs
    if (!height || !weight || height <= 0 || weight <= 0) {
      return NextResponse.json(
        { message: "Height and weight must be valid numbers." },
        { status: 400 }
      )
    }

    // -----------------------------
    // BMI Calculation
    // Formula for pounds/inches
    // BMI = (weight × 703) / height²
    // -----------------------------
    const bmi = (weight * 703) / (height * height)

    // -----------------------------
    // Basic Demo Energy Score
    // This is placeholder logic for demo
    // -----------------------------
    let energyScore = 50

    if (!isNaN(sleepHours)) {
      energyScore += sleepHours * 5
    }

    if (!isNaN(currentEnergyLevel)) {
      energyScore += currentEnergyLevel * 3
    }

    if (fitnessLevel === "Active") {
      energyScore += 10
    }

    if (fitnessLevel === "Sedentary") {
      energyScore -= 10
    }

    // Clamp energy score between 0 and 100
    energyScore = Math.max(0, Math.min(100, energyScore))

    // Return results
    return NextResponse.json({
      bmi: Number(bmi.toFixed(1)),
      energyScore,
    })

  } catch (error) {
    return NextResponse.json(
      { message: "Calculation error." },
      { status: 500 }
    )
  }
}