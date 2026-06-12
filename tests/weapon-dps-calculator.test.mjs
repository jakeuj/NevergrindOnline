import assert from 'node:assert/strict';
import test from 'node:test';

import { calculateWeaponDps } from '../src/lib/weapon-dps-calculator.ts';
import { WEAPON_DPS_PRESETS } from '../src/data/weapon-dps-presets.ts';

function presetByName(name) {
  const preset = WEAPON_DPS_PRESETS.find((item) => item.name === name);
  assert.ok(preset, `Missing preset: ${name}`);
  return preset;
}

function resultSummary(result) {
  return {
    minDamage: result.minDamage,
    maxDamage: result.maxDamage,
    speed: result.speed,
    dps: result.dps,
    speedDisplay: result.display.speed,
    dpsDisplay: result.display.dps,
  };
}

test('calculates manual weapon values using FC2 rounding order', () => {
  const result = calculateWeaponDps({
    minDamage: 100,
    maxDamage: 200,
    speed: 2,
    damageEnhance: 50,
    attackSpeedIncrease: 25,
  });

  assert.deepEqual(resultSummary(result), {
    minDamage: 150,
    maxDamage: 300,
    speed: 1.5,
    dps: 150,
    speedDisplay: '1.5',
    dpsDisplay: '150.0',
  });
});

test('matches Gleaming Swiftblade with ether, one Cros, and one Rok', () => {
  const preset = presetByName('Gleaming Swiftblade');
  const result = calculateWeaponDps({
    ...preset,
    ether: true,
    runeDamage: 1,
    runeSpeed: 1,
  });

  assert.deepEqual(resultSummary(result), {
    minDamage: 219,
    maxDamage: 373,
    speed: 1.63,
    dps: 181.6,
    speedDisplay: '1.63',
    dpsDisplay: '181.6',
  });
});

test('matches Monsoon SwiftBlade as a two-hand weapon with two Cros and two Rok', () => {
  const preset = presetByName('Monsoon SwiftBlade');
  const result = calculateWeaponDps({
    ...preset,
    runeDamage: 2,
    runeSpeed: 2,
  });

  assert.deepEqual(resultSummary(result), {
    minDamage: 454,
    maxDamage: 705,
    speed: 2.22,
    dps: 261,
    speedDisplay: '2.22',
    dpsDisplay: '261.0',
  });
});

test('matches Himmelsdolch with ether and three Rok', () => {
  const preset = presetByName('Himmelsdolch');
  const result = calculateWeaponDps({
    ...preset,
    ether: true,
    runeSpeed: 3,
  });

  assert.deepEqual(resultSummary(result), {
    minDamage: 203,
    maxDamage: 342,
    speed: 1.59,
    dps: 171.4,
    speedDisplay: '1.59',
    dpsDisplay: '171.4',
  });
});

test('keeps Reito Doku aligned with the FC2 preset snapshot', () => {
  const preset = presetByName('Reito Doku');
  const result = calculateWeaponDps({
    ...preset,
    ether: true,
    runeSpeed: 3,
  });

  assert.deepEqual(resultSummary(result), {
    minDamage: 273,
    maxDamage: 408,
    speed: 0.88,
    dps: 386.9,
    speedDisplay: '0.88',
    dpsDisplay: '386.9',
  });
});

test('does not calculate DPS when final speed is zero or lower', () => {
  const result = calculateWeaponDps({
    minDamage: '',
    maxDamage: '',
    speed: 0,
  });

  assert.equal(result.minDamage, 0);
  assert.equal(result.maxDamage, 0);
  assert.equal(result.dps, null);
  assert.equal(result.display.dps, '無法計算 DPS');
});
