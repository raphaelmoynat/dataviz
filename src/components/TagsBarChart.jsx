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
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const TagsBarChart = () => {
    const [tagsData, setTagsData] = useState({
        labels: [],
        datasets: [{
            label: "Nombre de questions",
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderWidth: 1
        }]
    })

    const [chartKey, setChartKey] = useState(0)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://127.0.0.1:8000/questions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                const questions = response.data

                const tagCounts = {}
                questions.forEach(question => {
                    if (question.tags && Array.isArray(question.tags)) {
                        question.tags.forEach(tag => {
                            tagCounts[tag] = (tagCounts[tag] || 0) + 1
                        })
                    }
                })

                const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 8)

                const labels = sortedTags.map(tag => tag[0]);
                const data = sortedTags.map(tag => tag[1]);

                setChartKey(prev => prev + 1)

                setTagsData({
                    labels: labels,
                    datasets: [{
                        label: "Nombre de questions",
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderWidth: 1
                    }]
                })

            } catch (error) {
                console.error(error)
            }
        }

        fetchQuestions()
    }, [])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Répartition des questions par tags",
                font: {
                    size: 18
                }
            },
        }
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
                <Bar key={chartKey} options={options} data={tagsData}/>
        </div>
    );
}

export default TagsBarChart