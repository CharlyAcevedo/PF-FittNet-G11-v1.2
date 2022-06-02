import React from "react";
// import LogoFit from '../../asets/images/logo_fitnet.jpg';
import styles from './styles/Incomes.module.css'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function IncomesGraph(){
    

    const data = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [{
            label: "Ingreso Mensual",
            backgroundColor: "#fb6d10",
            bordercolor: "#fb6d10",
            borderWhidth: 1,
            hoverBackgroundColor: "#EB3E1B45",
            hoverBordercolor: "#EB3E1B45",
            data: [25.5, 30.5, 38.2, 45.4, 58.8]
        }]
    };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Ingresos Mensuales',
          },
        },
      };

    return (
        <div className={styles.main_container}>
            <div className={styles.graph_container}>
            <h2>Grafica por Ingresos</h2>
            <Bar  data={data} options={options}/>
            </div>
        </div>
    )
};