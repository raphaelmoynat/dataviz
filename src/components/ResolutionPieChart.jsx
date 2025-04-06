import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export const ResolutionPieChart = () => {
    const [resolutionData, setResolutionData] = useState({
        labels: ['Questions résolues', 'Questions non résolues'],
        datasets: [{
            label: 'Taux de résolution',
            data: [0, 0],
            backgroundColor: [
                'rgba(75, 192, 192, 0.7)',
                'rgba(255, 99, 132, 0.7)'
            ],
            borderWidth: 1
        }]
    })

    const [chartKey, setChartKey] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://stackoversize.raphaelmoynat.com/questions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const questions = response.data;
                let resolvedQuestions = 0
                let unresolvedQuestions = 0

                questions.forEach(question => {
                    const hasBestReply = question.replies.some(reply => reply.is_best);
                    if (hasBestReply) {
                        resolvedQuestions++
                    } else {
                        unresolvedQuestions++
                    }
                })
                setChartKey(prev => prev + 1)
                setResolutionData({
                    labels: ['Questions résolues', 'Questions non résolues'],
                    datasets: [{
                        label: 'Taux de résolution',
                        data: [resolvedQuestions, unresolvedQuestions],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 99, 132, 0.7)'
                        ],
                        borderWidth: 1
                    }]
                });

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
            title: {
                display: true,
                text: 'Taux de résolution des questions',
                font: {
                    size: 18
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const value = context.parsed;
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${context.label}: ${value} (${percentage}%)`
                    }
                }
            }
        }
    };

    return (
        <div style={{width: '100%', height: '100%'}}>
                <Pie key={chartKey} options={options} data={resolutionData}/>
        </div>
    );
};

export default ResolutionPieChart