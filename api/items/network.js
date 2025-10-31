const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector, electricalConsumption, costElectricalKM, combustionConsumption, fuelConsumption, fuelEfficiency, fuelCostKm, energyKm,emisionKm,savedEnergy,avoidedEmissions,monthlySavings,annualSavings,youngTree, oldTree, energyH2Cylinders, energyH2LowPresure, energyConsumed, hydrogenMass, litersRequired} = require('../../calculators/environment')
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
        const OlTr=oldTree(AE);
        const EnLi=energyH2Cylinders(req.params.nominal_energy);
        const EnLo=energyH2LowPresure(EnLi);
        const En_Co=energyConsumed(EnLo);
        const HyMa=hydrogenMass(EnLo);
        const LiRe=litersRequired(HyMa);
  


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
        list["oldTree"]=OlTr;
        list["energyH2Cylinders"]=EnLi;
        list["energyH2LowPresure"]=EnLo;
        list["energyConsumed"]=En_Co;
        list["hydrogenMass"]=HyMa;
        list["litersRequired"]=LiRe;

        response.success(req, res,list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})

module.exports = router ;