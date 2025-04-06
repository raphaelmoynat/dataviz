import TagsBarChart from "./TagsBarChart.jsx";
import DoughnutChart from "./DoughnutChart.jsx";
import TopActiveUsersChart from "./ActiveUserChart.jsx";
import {TimelineChart} from "./TimeLine.jsx";
import ResolutionPieChart from "./ResolutionPieChart.jsx";
import '../Dashboard.css'
import StatsCard from "./StatsCard.jsx";


export default function Dashboard() {
    return (
        <div className="container">
            <div className="title">
                Dashboard StackOversize
            </div>

            <div className="chart-row">
                <div className="chart-column">

                        <div className="chart-container">
                            <div className="chart-header">Statistiques globales</div>
                            <div className="chart-item">
                                <StatsCard/>
                            </div>
                        </div>
                    <div className="chart-container">
                        <div className="chart-header">Répartition des tags</div>
                        <div className="chart-item">
                            <TagsBarChart/>
                        </div>
                    </div>

                    <div className="chart-container">
                        <div className="chart-header">Répartition des utilisateurs</div>
                        <div className="chart-item pie-chart">
                            <DoughnutChart/>
                        </div>
                    </div>

                </div>

                <div className="chart-column">
                    <div className="chart-container">
                        <div className="chart-header">Utilisateurs les plus actifs</div>
                        <div className="chart-item">
                            <TopActiveUsersChart/>
                        </div>
                    </div>

                    <div className="chart-container">
                        <div className="chart-header">Taux de résolution des questions</div>
                        <div className="chart-item pie-chart">
                            <ResolutionPieChart/>
                        </div>
                    </div>

                    <div className="chart-container">
                        <div className="chart-header">Évolution des questions</div>
                        <div className="chart-item line-chart">
                            <TimelineChart/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}