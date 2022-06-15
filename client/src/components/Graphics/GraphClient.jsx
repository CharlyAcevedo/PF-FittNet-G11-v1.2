import React, { useEffect } from "react";
import styles from './styles/Incomes.module.css'
import { Bar } from 'react-chartjs-2';
import { getMySales, getUser } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

  let { userId } = useParams();
    
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser(userId))
    dispatch(getMySales(userId))// eslint-disable-next-line
  },[userId])

  const mySales = useSelector((state) => state.partnerSales)



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
            text: 'Mis Clientes',
          },
        },
      };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.graphContainer}>
            <h2>Clientes Inscritos</h2>
            {mySales ? <Bar  data={data} options={options}/> : "Loading..."}
            <div><button className={styles.btnDetails}>Ver Detalles</button></div>
            </div>
        </div>
    )
};