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

export default function ClientsGraph(){

    

    const data = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [{
            label: "Step Ahead",
            backgroundColor: "rgb(255, 39, 103, 0.650)",
            bordercolor: "rgb(255, 39, 103, 0.650)",
            borderWhidth: 1,
            hoverBackgroundColor: "#EB3E1B45",
            hoverBordercolor: "#EB3E1B45",
            data: [25, 30, 38, 45, 58]
        },{
          label: "Spinning Center",
          backgroundColor: "rgb(255, 64, 80, 0.650)",
          bordercolor: "rgb(255, 64, 80, 0.650)",
          borderWhidth: 1,
          hoverBackgroundColor: "#EB3E1B45",
          hoverBordercolor: "#EB3E1B45",
          data: [48, 39, 32, 40, 51]
      }
      ]
    };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Clientes por Gimnasio',
          },
        },
      };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.graphContainer}>
            <h2>Clientes Inscritos</h2>
            <Bar  data={data} options={options}/>
            <div><button className={styles.btnDetails}>Ver Detalles</button></div>
            </div>
        </div>
    )
};