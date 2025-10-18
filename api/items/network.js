const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const { tiMonth,fuelEnergySelector,electricalConsumption,costElectricalKM,combustionConsumption,fuelConsumption,fuelEfficiency,fuelCostKm,energyKm,emisionKm,savedEnergy,avoidedEmissions,monthlySavings,annualSavings,youngTree} = require('../../calculators/environment')
const { areaCirculo } = require('../../calculators/calculo1')
const area =  require('../../calculators/personal')
const tableInjected = 'my_table'

router.get('/enviroment/:ipc/:fuel/:nominal_energy/:autonomy_nominal', (req, res) => {
    try {
        const annual_use=2;
        const ipc= tiMonth(parseFloat(req.params.ipc))
        const fes = fuelEnergySelector(req.params.fuel)
        const EC= electricalConsumption(parseFloat(req.params.nominal_energy),parseFloat(req.params.autonomy_nominal))
        const CEK = costElectricalKM(EC,3);
        const CC =combustionConsumption(EC);
        const FuelC= fuelConsumption(CC,fes.fuel_energy)
        const FE=fuelEfficiency(FuelC);
        const FC=fuelCostKm(fes.fuel_price,FuelC)
        const EK=energyKm(CC);
        const eK=emisionKm(fes.emision_factor,EK);
        const SE=savedEnergy(CC,EC,annual_use);
        const AE=avoidedEmissions(eK,annual_use);
        const MS=monthlySavings(FC,CEK,annual_use);
        const AS=annualSavings(MS,ipc);
        const YT=youngTree(AE);
  


        let list ={}
        list["it_Month"]=ipc
        list["fuel_energy_selector"]=fes;
        list["electrical_consopcion"]=EC;
        list["costElectricalKM"]=CEK;
        list["combustionConsumption"]=CC;
        list["fuelConsumption"] = FuelC;
        list["fuelEfficiency"] = FE;
        list["fuelCostKm"] = FC;
        list["energyKm"]=EK;
        list["emisionKm"]=eK;
        list["savedEnergy"]=SE;
        list["avoidedEmissions"]=AE;
        list["monthlySavings"] = MS;
        list["annualSavings"]=AS;
        list["youngTree"]=YT;

        response.success(req, res,list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})

module.exports = router ;