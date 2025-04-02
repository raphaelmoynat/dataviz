import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export const DoughnutChart = () => {
    const [userData, setUserData] = useState({
        labels: [],
        datasets: [{
            label: "Nombre d'utilisateurs",
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
            ],
            borderWidth: 1
        }]
    });

    const [chartKey, setChartKey] = useState(0)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://127.0.0.1:8000/profile/list', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                const users = response.data

                const classCounts = {}
                users.forEach(user => {
                    const userClass = user.user_class || 'Non spécifié'
                    classCounts[userClass] = (classCounts[userClass] || 0) + 1
                });

                const classes = Object.keys(classCounts)
                const counts = Object.values(classCounts)

                setChartKey(prev => prev + 1)

                setUserData({
                    labels: classes,
                    datasets: [{
                        label: "Nombre d'utilisateurs",
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                        ],
                        borderWidth: 1
                    }]
                });

            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers()
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Répartition des utilisateurs par classe',
                font: {
                    size: 18
                }
            }
        }
    };

    return (
        <div style={{width: '100%', height: '100%'}}>
                <Doughnut key={chartKey} options={options} data={userData}/>
        </div>
    )
};
export default DoughnutChart;