export type NumericInput = number | string | null | undefined;

export interface WeaponDpsInput {
  minDamage?: NumericInput;
  maxDamage?: NumericInput;
  speed?: NumericInput;
  damageEnhance?: NumericInput;
  attackSpeedIncrease?: NumericInput;
  ether?: boolean;
  runeDamage?: NumericInput;
  runeSpeed?: NumericInput;
  isTwoHand?: boolean;
}

export interface WeaponDpsDisplayResult {
  minDamage: string;
  maxDamage: string;
  speed: string;
  dps: string;
}

export interface WeaponDpsResult {
  minDamage: number;
  maxDamage: number;
  speed: number;
  dps: number | null;
  isCalculable: boolean;
  damageRuneValue: number;
  speedRuneValue: number;
  display: WeaponDpsDisplayResult;
}

export const ONE_HAND_DAMAGE_RUNE_VALUE = 20;
export const TWO_HAND_DAMAGE_RUNE_VALUE = 40;
export const ONE_HAND_SPEED_RUNE_VALUE = 0.07;
export const TWO_HAND_SPEED_RUNE_VALUE = 0.14;
export const ETHER_DAMAGE_MULTIPLIER = 1.33;

function numericValue(value: NumericInput): number {
  if (value === null || value === undefined || value === '') return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function roundTo(value: number, digits: number): number {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function formatMaybeFixedOne(value: number): string {
  return Number.isInteger(value) ? value.toFixed(1) : String(value);
}

export function calculateWeaponDps(input: WeaponDpsInput): WeaponDpsResult {
  const isTwoHand = Boolean(input.isTwoHand);
  const damageRuneValue = isTwoHand ? TWO_HAND_DAMAGE_RUNE_VALUE : ONE_HAND_DAMAGE_RUNE_VALUE;
  const speedRuneValue = isTwoHand ? TWO_HAND_SPEED_RUNE_VALUE : ONE_HAND_SPEED_RUNE_VALUE;

  let baseMinDamage = numericValue(input.minDamage);
  let baseMaxDamage = numericValue(input.maxDamage);

  if (input.ether) {
    baseMinDamage = Math.floor(baseMinDamage * ETHER_DAMAGE_MULTIPLIER);
    baseMaxDamage = Math.floor(baseMaxDamage * ETHER_DAMAGE_MULTIPLIER);
  }

  const damageMultiplier = 1 + numericValue(input.damageEnhance) / 100;
  let minDamage = baseMinDamage * damageMultiplier;
  minDamage = roundTo(minDamage, 1);
  minDamage = Math.round(minDamage);

  let maxDamage = baseMaxDamage * damageMultiplier;
  maxDamage = roundTo(maxDamage, 1);
  maxDamage = Math.round(maxDamage);

  minDamage += numericValue(input.runeDamage) * damageRuneValue;
  maxDamage += numericValue(input.runeDamage) * damageRuneValue;

  let speed = numericValue(input.speed) * ((100 - numericValue(input.attackSpeedIncrease)) / 100);
  speed = roundTo(speed, 1);
  speed = roundTo(speed - numericValue(input.runeSpeed) * speedRuneValue, 2);

  const isCalculable = Number.isFinite(speed) && speed > 0;
  const dps = isCalculable ? roundTo(((minDamage + maxDamage) / 2) / speed, 1) : null;

  return {
    minDamage,
    maxDamage,
    speed,
    dps,
    isCalculable,
    damageRuneValue,
    speedRuneValue,
    display: {
      minDamage: String(minDamage),
      maxDamage: String(maxDamage),
      speed: formatMaybeFixedOne(speed),
      dps: dps === null ? '無法計算 DPS' : formatMaybeFixedOne(dps),
    },
  };
}

