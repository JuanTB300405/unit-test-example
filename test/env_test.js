const {test, describe, it} = require('node:test');
const assert = require('node:assert');
const {litersRequired, hydrogenMass, energyConsumed, energyH2LowPresure, energyH2Cylinders,tiMonth, youngTree, oldTree, annualSavings,  monthlySavings, avoidedEmissions, savedEnergy, emisionKm, fuelCostKm, energyKm, fuelEfficiency, fuelEnergySelector, fuelConsumption, combustionConsumption,costElectricalKM, electricalConsumption} = require("../calculators/environment")

describe("test que deben dar pass", ()=>{

    it("prueba de tiMonth",()=>{
        assert.strictEqual(tiMonth(2),0.0016515813019202241)
    })

    it("prueba de datos de combustible",()=>{
        assert.deepStrictEqual(fuelEnergySelector("gasoline"),{"fuel_price": 16700,"fuel_energy": 35.58,"emision_factor": 69.25
        })
    })

    it("prueba de electricalConsumption", ()=>{
        assert.strictEqual(electricalConsumption(2,2),1.1111111111111112)
    } )

    it("prueba para la funcion costElectricalKM", ()=>{
        assert.strictEqual(costElectricalKM(1.1111111111111112,3),3.3333333333333335)
    })

    it("prueba para la funcion combustionConsumption", ()=>{
        assert.strictEqual(combustionConsumption(1.1111111111111112),4.11522633744856)
    })

    it("prueba para la funcion fuelConsumption",()=>{
        assert.strictEqual(fuelConsumption(4.11522633744856,35.58),0.11566122364948173)
    })

    it("prueba para la funcion fuelEfficiency", ()=>{
        assert.strictEqual(fuelEfficiency(0.11566122364948173),8.64594)
    })
    
    it("prueba para la funcion energyKm",()=>{
        assert.strictEqual(energyKm(4.11522633744856),14814814.814814815)
    })

    it("prueba para la funcion fuelCostKm",()=>{
        assert.strictEqual(fuelCostKm(16700,0.11566122364948173),1931.5424349463449)
    })
})

describe("pruebas que deben dar fail", ()=>{

    it("prueba para la funcion  emisionKm",()=>{
        assert.notStrictEqual(emisionKm(69.25,14814814.814814815),1025.9259259259259) //se fuerza a que de fail
    })

    it("prueba para la funcion savedEnergy",()=>{
        assert.notStrictEqual(savedEnergy(4.11522633744856,1.1111111111111112,2),6.008230452674897)
    })

    it("prueba para la funcion avoidedEmissions", ()=>{
        assert.notStrictEqual(avoidedEmissions(1025.9259259259259,2),0.0020518518518518516)
    })

    it("prueba para la funcion monthlySavings",()=>{
        assert.notStrictEqual(monthlySavings(1931.5424349463449,3.3333333333333335,2),321.3681836021686)
    })

    it("prueba para la funcion annualSavings", ()=>{
        assert.notStrictEqual(annualSavings(321.3681836021686,0.0016515813019202241),3891.6423094465686)
    })
})

describe("pruebas que deben dar cancelado o Skiped", ()=>{

    test("cancelacion o skiped de la funcion youngTree por parametro vacio", (t)=>{
      const AvoidE= null
      if (AvoidE === null){
        t.skip("prueba cancelada por variable nula")
      } else{
        assert.strictEqual(youngTree(AvoidE),0)
      }
    })
    
    test("cancelacion o skiped de la funcion oldTree por parametro vacio", (t)=>{
      const AvoidE= null
      if (AvoidE === null){
        t.skip("prueba cancelada por variable nula")
      } else{
        assert.strictEqual(oldTree(AvoidE),0)
      }
    })
  
    test("cancelacion o skiped de la funcion energyH2Cylinders por parametro vacio", (t)=>{
      const nominal_energy= null
      if (nominal_energy === null){
        t.skip("prueba cancelada por variable nula")
      } else{
        assert.strictEqual(energyH2Cylinders(nominal_energy),3.7037037037037033)
      }
    })

    test("cancelacion o skiped de la funcion energyH2LowPresure por parametro vacio", (t)=>{
      const EL= null
      if (EL === null){
        t.skip("prueba cancelada por variable nula")
      } else{
        assert.strictEqual(energyH2LowPresure(ELL),3.898635477582846)
      }
    })

    test("cancelacion o skiped de la funcion energyConsumed por parametro vacio", (t)=>{
      const EHL= null
      if (EHL === null){
        t.skip("prueba cancelada por variable nula")
      } else{
        assert.strictEqual(energyConsumed(EHL),5.129783523135323)
      }
    })

    test("cancelacion o skiped de la funcion hydrogenMass por parametro vacio", (t)=>{
      const EHL= null
      if (EHL === null){
        t.skip("prueba cancelada por variable nula")
      } else{
        assert.strictEqual(hydrogenMass(EHL),0.11697076140362574)
      }
    })

    test("cancelacion o skiped de la funcion litersRequired por parametro vacio", (t)=>{
      const HM= null
      if (HM === null){
        t.skip("prueba cancelada por variable nula")
      } else{
        assert.strictEqual(litersRequired(HM),1.0527368526326317)
      }
    }) 
})
