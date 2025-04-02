import TagsBarChart from "./TagsBarChart.jsx";
import DoughnutChart from "./DoughnutChart.jsx";
import TopActiveUsersChart from "./ActiveUserChart.jsx";

export default function Dashboard() {
    return (
        <>
            <TagsBarChart/>
            <DoughnutChart/>
            <TopActiveUsersChart/>
        </>

    )
}