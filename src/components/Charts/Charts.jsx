import React,{useState,useEffect} from 'react'; 
import { fetchDailyData } from '../../api';
import { Line,Bar} from 'react-chartjs-2';
  

import styles from './Charts.module.css';

const Charts =({data:{confirmed,recovered,deaths,lastUpdate},country}) =>
{
    const [dailyData,setDailyData] = useState([]);// Empty Array
    useEffect(()=>{
        const fetchAPI = async () => {
            const intialData=await fetchDailyData(); 
            setDailyData(intialData);
        }; 
        console.log(dailyData);
        fetchAPI(); 
    },[setDailyData]);
    const lineChart = (
      dailyData[0] ? (
        <Line
          data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
              data: dailyData.map((data) => data.confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            }, 
            
            {
              data: dailyData.map((data) => data.deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
            },
            ],
          }}
        />
      ) : null
    );
    const barChart = (
      confirmed ? (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
              {
                label: 'People',
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [confirmed.value, recovered.value, deaths.value],
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          }}
        />
      ) : null
    );
     
    return (
   
        <div className={styles.container}>
            {
                country?barChart:lineChart
            }       
            
        </div>
     
    )
}

export default Charts;