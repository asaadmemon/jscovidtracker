import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchMyAPI = async () => {
            setDailyData(await fetchDailyData());

            //const initialDailyData = await fetchDailyData();

        }

        fetchMyAPI();
    }, []);

    let options = {
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 5000000
                }
            }]
        }
    };

    const lineChart = (
        dailyData.length
            ? (
                <Line className={styles.chart}
                    data={{
                        labels: dailyData.map(({ date }) => (date)),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'infected',
                            borderColor: 'orange',
                            backgroundColor: 'rgba(255, 166, 0, 0.616)',
                            fill: true,
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgb(207, 77, 77)',
                            fill: true,
                        },

                        /* API was not showing receovered data and 
                        it was coming as zero so I've disabled it
                        {
                            data: dailyData.map(({ recovered }) => recovered),
                            label: 'Recovered',
                            borderColor: 'green',
                            backgroundColor: 'greenyellow',
                            fill: true,
                        },*/
                        ],
                        options: options
                    }}
                />) : null
    );

    const barChart = (
        confirmed
            ? (
                <Bar className={styles.chart}
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['orange', 'green', 'red'],
                            data: [confirmed.value, recovered.value, deaths.value],
                        }],
                    }}
                    options={{
                        legend: { display: false }, responsive: true,
                        title: { display: true, fontStyle: 'bold', fontSize: 18, text: `Current state in ${country}` },
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
