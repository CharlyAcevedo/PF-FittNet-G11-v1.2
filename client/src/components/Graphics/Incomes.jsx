import React from "react";
// import LogoFit from '../../asets/images/logo_fitnet.jpg';
import styles from './styles/Incomes.module.css'
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export default function IncomesGraph(){
    
  const gym1 = "Step Ahead";
  const gym2 = "Spinning Center"

    const data = {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [{
            label: gym1,
            backgroundColor: "#fb6d10",
            bordercolor: "#fb6d10",
            borderWhidth: 1,
            hoverBackgroundColor: "#EB3E1B45",
            hoverBordercolor: "#EB3E1B45",
            data: [25.5, 30.5, 38.2, 45.4, 58.8]
        },{
          label: gym2,
          backgroundColor: "#864d26",
          bordercolor: "#864d26",
          borderWhidth: 1,
          hoverBackgroundColor: "#EB3E1B45",
          hoverBordercolor: "#EB3E1B45",
          data: [38.5, 32.5, 30.2, 40.4, 42.8]
      }]
    };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Ingresos Mensuales',
          },
        },
      };

      const monthIncomes = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARG'}).format(58.8 + 42.8)
      const gym2Incomes = (38.5 + 32.5 + 30.2 + 40.4 + 42.8)*1000
      const gym1Incomes = (25.5 + 30.5 + 38.2 + 45.4 + 58.8)*1000
      const totalIncomes = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARG'}).format(gym1Incomes + gym2Incomes)

    return (
        <div className={styles.mainContainer}>
            <div className={styles.graphContainer}>
            <h2>Grafica por Ingresos</h2>
            <div className={styles.doubleContainer}>
              <div className={styles.doubleContainer}>
            <Bar  data={data} options={options}/>
              </div>
              <div className={styles.doubleContainer}>
            <Line data={data} options={options}/>
              </div>
            </div>
            <br />
            <div >
            <h5>Desgloce de Ganancias</h5>
            <p>Sus ganancias totales desde que esta con Fittnet son de {totalIncomes}</p>
            <p>Este Mes Gano {monthIncomes} en todos sus gimnasios</p>
            <p></p>
            </div>
            <br />
            <div><button className={styles.btnDetails}>Ver Detalles</button></div>
            </div>
        </div>
    )
};