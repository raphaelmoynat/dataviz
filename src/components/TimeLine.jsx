import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const TimelineChart = () => {
    const [questionsData, setQuestionsData] = useState({
        labels: [],
        datasets: [{
            label: "Nombre de questions",
            data: [],
            borderColor: 'rgba(75, 192, 192, 0.7)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2
        }]
    })

    const [chartKey, setChartKey] = useState(0)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://stackoversize.raphaelmoynat.com/questions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const questions = response.data;
                const compteMois = {}

                for (let question of questions) {
                    const mois = question.created_at.slice(0, 7)

                    if (compteMois[mois]) {
                        compteMois[mois] = compteMois[mois] + 1
                    } else {
                        compteMois[mois] = 1
                    }
                }
                const moisTries = Object.keys(compteMois).sort()


                setChartKey(prev => prev + 1)

                setQuestionsData({
                    labels: moisTries,
                    datasets: [{
                        label: "Nombre de questions",
                        data: moisTries.map(mois => compteMois[mois]),
                        borderColor: 'lightblue',
                        backgroundColor: 'lightblue',
                        borderWidth: 2
                    }]
                })

            } catch (error) {
                console.error(error)
            }
        };

        fetchQuestions()
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Evolution du nombre de questions dans le temps",
                font: {
                    size: 18
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Nombre de questions'
                },
                ticks: {
                    precision: 0
                }
            }
        }
    };

    return (
        <div style={{width: '100%', height: '100%'}}>
                <Line key={chartKey} options={options} data={questionsData}/>
        </div>
    );
};

export default TimelineChart;