import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import "../Styles/Dashboard.css";
import Footer from "./Footer.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const AnalyticsDashboard = () => {
  const statistics = {
    "Total Patients": 1200,
    "Active Doctors": 45,
    "Appointments Today": 85,
    "Pharmacies Nearby": 15,
  };

  const appointmentAnalysis = {
    Jan: 200,
    Feb: 180,
    Mar: 220,
    Apr: 210,
    May: 230,
    Jun: 250,
    Jul: 260,
    Aug: 240,
    Sep: 220,
    Oct: 230,
    Nov: 200,
    Dec: 190,
  };

  const demographics = {
    Male: 600,
    Female: 500,
    Others: 100,
  };

  const trends = {
    "Week 1": 80,
    "Week 2": 120,
    "Week 3": 100,
    "Week 4": 150,
  };

  const departments = {
    Cardiology: 50,
    Pediatrics: 30,
    Orthopedics: 40,
    Dermatology: 25,
    Neurology: 20,
  };

  const performanceMetrics = {
    "Average Wait Time (min)": 15,
    "Satisfaction Rating (%)": 85,
    "Daily Revenue (INR)": 50000,
  };

  return (
    <div className="container">
      <h3 className="info-title">
        <span>Analytics Dashboard</span>
      </h3>

      {/* General Statistics */}
      <section className="card">
        <h2>General Statistics</h2>
        <div className="stats-grid">
          {Object.entries(statistics).map(([key, value]) => (
            <div className="stat-card" key={key}>
              <h3>{key}</h3>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="card">
        <h2>Performance Metrics</h2>
        <div className="stats-grid">
          {Object.entries(performanceMetrics).map(([key, value]) => (
            <div className="stat-card" key={key}>
              <h3>{key}</h3>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Graphs Section */}
      <section className="card">
        <h2>Graphs</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Appointments</h3>
            <div className="chart-container">
              <Bar
                data={{
                  labels: Object.keys(appointmentAnalysis),
                  datasets: [
                    {
                      label: "Appointments",
                      data: Object.values(appointmentAnalysis),
                      backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </div>

          <div className="chart-card demographics-box">
            <h3>Demographics</h3>
            <div className="chart-container">
              <Pie
                data={{
                  labels: Object.keys(demographics),
                  datasets: [
                    {
                      label: "Demographics",
                      data: Object.values(demographics),
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  aspectRatio: 2,
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h3>Trends</h3>
            <div className="chart-container">
              <Line
                data={{
                  labels: Object.keys(trends),
                  datasets: [
                    {
                      label: "Trends",
                      data: Object.values(trends),
                      borderColor: "rgba(153, 102, 255, 1)",
                      backgroundColor: "rgba(153, 102, 255, 0.2)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </div>

          <div className="chart-card">
            <h3>Departments</h3>
            <div className="chart-container">
              <Bar
                data={{
                  labels: Object.keys(departments),
                  datasets: [
                    {
                      label: "Departments",
                      data: Object.values(departments),
                      backgroundColor: "rgba(255, 159, 64, 0.6)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default AnalyticsDashboard;
