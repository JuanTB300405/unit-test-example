const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, fuelEnergySelector, electricalConsumption, costElectricalKM, combustionConsumption, fuelConsumption, fuelEfficiency, fuelCostKm, energyKm,emisionKm,savedEnergy,avoidedEmissions,monthlySavings,annualSavings,youngTree, oldTree, energyH2Cylinders, energyH2LowPresure, energyConsumed, hydrogenMass, litersRequired} = require('../../calculators/environment')
const tableInjected = 'my_table'


router.get('/enviroment/:ipc/:fuel/:nominal_energy/:autonomy_nominal', (req, res) => {
    try {
        const annual_use=2; 
        const ipc= tiMonth(parseFloat(req.params.ipc)) /*tiene test PASS*/
        const fes = fuelEnergySelector(req.params.fuel)/*tiene test PASS*/
        const EC= electricalConsumption(parseFloat(req.params.nominal_energy),parseFloat(req.params.autonomy_nominal)) /*tiene test PASS*/
        const CEK = costElectricalKM(EC,3); /*tiene test PASS*/
        const CC =combustionConsumption(EC); /*tiene test PASS*/
        const FuelC= fuelConsumption(CC,fes.fuel_energy) /*tiene test PASS*/
        const FE=fuelEfficiency(FuelC); /*tiene test PASS*/
        const FC=fuelCostKm(fes.fuel_price,FuelC)  /*tiene test PASS*/  
        const EK=energyKm(CC); /*tiene test PASS*/
        const eK=emisionKm(fes.emision_factor,EK); /*tiene test FAIL*/
        const SE=savedEnergy(CC,EC,annual_use); /*tiene test FAIL*/
        const AE=avoidedEmissions(eK,annual_use); /*tiene test FAIL*/
        const MS=monthlySavings(FC,CEK,annual_use); /*tiene test FAIL*/ 
        const AS=annualSavings(MS,ipc); /*tiene test FAIL*/ 
        const YT=youngTree(AE); /*tiene test CANCELLED-SKIPED*/ 
        const OlTr=oldTree(AE); /*tiene test CANCELLED-SKIPED*/ 
        const EnLi=energyH2Cylinders(req.params.nominal_energy); /*tiene test CANCELLED-SKIPED*/ 
        const EnLo=energyH2LowPresure(EnLi);/*tiene test CANCELLED-SKIPED*/
        const En_Co=energyConsumed(EnLo); /*tiene test CANCELLED-SKIPED*/
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