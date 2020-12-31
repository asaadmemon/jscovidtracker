import React, {useState, useEffect} from 'react'
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css'

const Chart = ({data: { confirmed, recovered, deaths }, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchMyAPI = async () => {
            setDailyData(await fetchDailyData());

            //const initialDailyData = await fetchDailyData();
        
        }
    
        fetchMyAPI();
      }, []);

    const lineChart = (
        dailyData.length 
            ? (
                <Line
                 data={{
                    labels: dailyData.map(({date}) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'infected',
                        borderColor: 'orange',
                        fill: true,
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'red',
                        fill: true,
                    }, {
                        data: dailyData.map(({recovered}) => recovered),
                        label: 'Recovered',
                        borderColor: 'green',
                        backgroundColor: 'green',
                        fill: true,
                      },
                ],
                 }}
                />) : null
    );
console.log(country, confirmed, recovered, deaths);
    const barChart = (
        country
        ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['orange', 'green', 'red']
                    }],
                    data: [confirmed.value, recovered.value, deaths.value]
                }}
                options={{
                    legend: { display: false},
                    title: { display: true, text:`Current state in ${country}`},
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart
