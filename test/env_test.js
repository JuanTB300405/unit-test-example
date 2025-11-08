const assert = require('assert');
const {
  litersRequired,
  hydrogenMass,
  energyConsumed,
  energyH2LowPresure,
  energyH2Cylinders,
  tiMonth,
  youngTree,
  oldTree,
  annualSavings,
  monthlySavings,
  avoidedEmissions,
  savedEnergy,
  emisionKm,
  fuelCostKm,
  energyKm,
  fuelEfficiency,
  fuelEnergySelector,
  fuelConsumption,
  combustionConsumption,
  costElectricalKM,
  electricalConsumption
} = require("../calculators/environment");

describe("test que deben dar pass", function () {

  it("prueba de tiMonth", function () {
    assert.strictEqual(tiMonth(2), 0.0016515813019202241);
  });

  it("prueba de datos de combustible", function () {
    assert.deepStrictEqual(fuelEnergySelector("gasoline"), {
      "fuel_price": 16700,
      "fuel_energy": 35.58,
      "emision_factor": 69.25
    });
  });

  it("prueba de electricalConsumption", function () {
    assert.strictEqual(electricalConsumption(2, 2), 1.1111111111111112);
  });

  it("prueba para la funcion costElectricalKM", function () {
    assert.strictEqual(costElectricalKM(1.1111111111111112, 3), 3.3333333333333335);
  });

  it("prueba para la funcion combustionConsumption", function () {
    assert.strictEqual(combustionConsumption(1.1111111111111112), 4.11522633744856);
  });

  it("prueba para la funcion fuelConsumption", function () {
    assert.strictEqual(fuelConsumption(4.11522633744856, 35.58), 0.11566122364948173);
  });

  it("prueba para la funcion fuelEfficiency", function () {
    assert.strictEqual(fuelEfficiency(0.11566122364948173), 8.64594);
  });

  it("prueba para la funcion energyKm", function () {
    assert.strictEqual(energyKm(4.11522633744856), 14814814.814814815);
  });

  it("prueba para la funcion fuelCostKm", function () {
    assert.strictEqual(fuelCostKm(16700, 0.11566122364948173), 1931.5424349463449);
  });
});

describe("pruebas que deben dar fail", function () {

  it("prueba para la funcion emisionKm", function () {
    assert.notStrictEqual(emisionKm(69.25, 14814814.814814815), 1025.9259259259259);
  });

  it("prueba para la funcion savedEnergy", function () {
    assert.notStrictEqual(savedEnergy(4.11522633744856, 1.1111111111111112, 2), 6.008230452674897);
  });

  it("prueba para la funcion avoidedEmissions", function () {
    assert.notStrictEqual(avoidedEmissions(1025.9259259259259, 2), 0.0020518518518518516);
  });

  it("prueba para la funcion monthlySavings", function () {
    assert.notStrictEqual(monthlySavings(1931.5424349463449, 3.3333333333333335, 2), 321.3681836021686);
  });

  it("prueba para la funcion annualSavings", function () {
    assert.notStrictEqual(annualSavings(321.3681836021686, 0.0016515813019202241), 3891.6423094465686);
  });
});

describe("pruebas que deben dar cancelado o Skiped", function () {

  it.skip("cancelacion o skiped de la funcion youngTree por parametro vacio", function () {
    const AvoidE = null;
    if (AvoidE === null) this.skip();
    else assert.strictEqual(youngTree(AvoidE), 0);
  });

  it.skip("cancelacion o skiped de la funcion oldTree por parametro vacio", function () {
    const AvoidE = null;
    if (AvoidE === null) this.skip();
    else assert.strictEqual(oldTree(AvoidE), 0);
  });

  it.skip("cancelacion o skiped de la funcion energyH2Cylinders por parametro vacio", function () {
    const nominal_energy = null;
    if (nominal_energy === null) this.skip();
    else assert.strictEqual(energyH2Cylinders(nominal_energy), 3.7037037037037033);
  });

  it.skip("cancelacion o skiped de la funcion energyH2LowPresure por parametro vacio", function () {
    const EL = null;
    if (EL === null) this.skip();
    else assert.strictEqual(energyH2LowPresure(EL), 3.898635477582846);
  });

  it.skip("cancelacion o skiped de la funcion energyConsumed por parametro vacio", function () {
    const EHL = null;
    if (EHL === null) this.skip();
    else assert.strictEqual(energyConsumed(EHL), 5.129783523135323);
  });

  it.skip("cancelacion o skiped de la funcion hydrogenMass por parametro vacio", function () {
    const EHL = null;
    if (EHL === null) this.skip();
    else assert.strictEqual(hydrogenMass(EHL), 0.11697076140362574);
  });

  it.skip("cancelacion o skiped de la funcion litersRequired por parametro vacio", function () {
    const HM = null;
    if (HM === null) this.skip();
    else assert.strictEqual(litersRequired(HM), 1.0527368526326317);
  });
});
