import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const StatsCard = () => {
    const [stats, setStats] = useState({
        totalQuestions: {
            titre: "Nombre total de questions",
            valeur: 0,
        },
        totalUsers: {
            titre: "Nombre total d'utilisateurs",
            valeur: 0,
        },
        resolvedQuestions: {
            titre: "Questions résolues",
            valeur: 0,
        },
        activeUsers: {
            titre: "Utilisateurs actifs ce mois",
            valeur: 0,
        }
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');

                const questionsResponse = await axios.get('https://stackoversize.raphaelmoynat.com/questions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const questions = questionsResponse.data;

                const usersResponse = await axios.get('https://stackoversize.raphaelmoynat.com/profile/list', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const users = usersResponse.data

                const totalQuestions = questions.length
                const resolvedQuestions = questions.filter(q => q.replies.some(reply => reply.is_best)).length
                const totalUsers = users.length
                const activeUsers = users.filter(user => (user.questions_count || 0) + (user.replies_count || 0) > 0).length

                setStats({
                    totalQuestions: {
                        titre: "Nombre total de questions",
                        valeur: totalQuestions,
                    },
                    totalUsers: {
                        titre: "Nombre total d'utilisateurs",
                        valeur: totalUsers,
                    },
                    resolvedQuestions: {
                        titre: "Questions résolues",
                        valeur: resolvedQuestions,
                    },
                    activeUsers: {
                        titre: "Utilisateurs actifs ce mois",
                        valeur: activeUsers,
                    }
                })

            } catch (error) {
                console.error(error);
            }
        };

        fetchStats();
    }, [])

    return (
        <div className="stats-container bg-light p-3 h-100">
            <div className="row g-3">
                {Object.entries(stats).map(([key, stat]) => (
                    <div className="col-md-6" key={key}>
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <h6 className="card-subtitle mb-2 text-muted">{stat.titre}</h6>
                                <h3 className="card-title">{stat.valeur}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsCard;