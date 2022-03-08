import express from 'express';
import axios from 'axios';
import ObjectsToCsv from 'objects-to-csv'

const router = express.Router();

export const getData = async (request, response) => {
    let monthlyData = []
    const months = ["01","02","03","04","05","06","07","08","09","10","11","12"]

    try {

    let data = await axios.get(
        `https://helsinki-openapi.nuuka.cloud/api/v1.0/EnergyData/Daily/ListByProperty?Record=LocationName&SearchString=1000%20Hakaniemen%20kauppahalli&ReportingGroup=Electricity&StartTime=2019-01-01&EndTime=2019-12-31`)
    
    
    months.forEach(month => {
        
        let calculation = 0;
        data.data.forEach(day => {
            
            if (day.timestamp.substr(5,2) === month) {
                calculation += day.value
            }
        
        })
        monthlyData.push(calculation)
    })
    
    let finalData = [
        {kuukausi: "tammikuu", kulutus: monthlyData[0]},
        {kuukausi: "helmikuu", kulutus: monthlyData[1]},
        {kuukausi: "maaliskuu", kulutus: monthlyData[2]},
        {kuukausi: "huhtikuu", kulutus: monthlyData[3]},
        {kuukausi: "toukokuu", kulutus: monthlyData[4]},
        {kuukausi: "kesakuu", kulutus: monthlyData[5]},
        {kuukausi: "heinakuu", kulutus: monthlyData[6]},
        {kuukausi: "elokuu", kulutus: monthlyData[7]},
        {kuukausi: "syyskuu", kulutus: monthlyData[8]},
        {kuukausi: "lokakuu", kulutus: monthlyData[9]},
        {kuukausi: "marraskuu", kulutus: monthlyData[10]},
        {kuukausi: "joulukuu", kulutus: monthlyData[11]}
    ];

    let date= new Date().toLocaleDateString("fi-FI");
    console.log(date);

    

    (async () => {
        const csv = new ObjectsToCsv(finalData);
       
        // Save to file:
        await csv.toDisk(`./${date}.csv`);
       
        // Return the CSV file as string:
        console.log(await csv.toString());
      })();

      response.send(finalData);
    }
    catch (err) {
        console.log(err);
    }
}

export default router;