import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const TopActiveUsersChart = () => {
    const [userData, setUserData] = useState({
        labels: [],
        datasets: [{
            label: "Total des contributions",
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderWidth: 1
        }]
    })

    const [chartKey, setChartKey] = useState(0)

    useEffect(() => {
        const fetchActiveUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/profile/list', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const users = response.data
                const usersWithTotalContributions = users.map(user => ({
                    display_name: user.display_name,
                    total_contributions: (user.questions_count || 0) + (user.replies_count || 0)
                })).sort((a, b) => b.total_contributions - a.total_contributions)
                    .slice(0, 8)
                const labels = usersWithTotalContributions.map(user => user.display_name)
                const contributions = usersWithTotalContributions.map(user => user.total_contributions)

                setChartKey(prev => prev + 1)
                setUserData({
                    labels: labels,
                    datasets: [{
                        label: "Total des contributions",
                        data: contributions,
                        backgroundColor: 'rgba(75, 192, 192, 0.7)',
                        borderWidth: 1
                    }]
                });

            } catch (error) {
                console.error(error)
            }
        }
        fetchActiveUsers()
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Top utilisateurs les plus actifs'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Nombre total de contributions'
                },
                ticks: {
                    precision: 0
                }
            }
        }
    }

    return (
        <div className="card" style={{ height: '400px' }}>
            <div className="card-body">
                <Bar key={chartKey} options={options} data={userData}/>
            </div>
        </div>
    )
};

export default TopActiveUsersChart;