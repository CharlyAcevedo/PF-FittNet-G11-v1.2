import React, { useEffect } from "react";
import styles from './styles/Incomes.module.css'
import { getMySales, getUser } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

  let { userId } = useParams();
    
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser(userId))
    dispatch(getMySales(userId))// eslint-disable-next-line
  },[userId])

  
  const mySales = useSelector((state) => state.partnerSales)
  const partnerData = useSelector((state) => state.partnerDetails)
  console.log(mySales)
  let counter = 10;
  
  const myDataSets = mySales ? mySales.salesPreGym.map((g) => {
    counter = counter + 5;
    let barColor = "#ff2767"
    let dataSet = {
      label: g.gymName,
      backgroundColor: barColor,
      bordercolor: barColor,
      borderWhidth: 1,
      hoverBackgroundColor: "#ff276745",
      hoverBordercolor: "#ff276745",
      data: [g.totalSales/1000, g.salesNumber ],
    };
    console.log(dataSet)
    return dataSet
  }) : []
  console.log(myDataSets)

    
  // const gym1 = "Step Ahead";
  // const gym2 = "Spinning Center"

    const data = {
        labels: ["Ganancias en MDP", "Ventas"],
        datasets: myDataSets
      //   [{
      //       label: gym1,
      //       backgroundColor: "#fb6d15",
      //       bordercolor: "#fb6d15",
      //       borderWhidth: 1,
      //       hoverBackgroundColor: "#EB3E1B45",
      //       hoverBordercolor: "#EB3E1B45",
      //       data: [25.5, 30.5, 38.2, 45.4, 58.8]
      //   },{
      //     label: gym2,
      //     backgroundColor: "#864d26",
      //     bordercolor: "#864d26",
      //     borderWhidth: 1,
      //     hoverBackgroundColor: "#EB3E1B45",
      //     hoverBordercolor: "#EB3E1B45",
      //     data: [38.5, 32.5, 30.2, 40.4, 42.8]
      // }]
    };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Ingresos Por Gimnasio',
          },
        },
      };

      // const monthIncomes = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARG'}).format(58.8 + 42.8)
      // const gym2Incomes = mySales.salesPerGym[1].totalsales
      // const gym1Incomes = mySales.salesPerGym[0].totalsales
      const totalIncomes = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARG'}).format(mySales.totalSales)

    return (
        <div className={styles.mainContainer}>
          <div className={styles.graphContainer}>
            <h2>Grafica por Ingresos</h2>
            <div className={styles.doubleContainer}>
              <div className={styles.doubleContainer}>
                <Bar  data={data} options={options}/>
              </div>
              {/* <div className={styles.doubleContainer}>
            <Line data={data} options={options}/>
              </div> */}
            </div>
            <br />
            <div >
            <h5>Estimado {partnerData.name + " " + partnerData.lastName} este es el desgloce de sus ingresos en Fittnet</h5>
            <p>Sus ganancias totales desde que esta con Fittnet son de {totalIncomes}</p>
            <p>Con un total de {mySales.salesNumber} ventas en todos sus gimnasios</p>
            {mySales && mySales.salesPreGym.map((g) => {
              return <div key={g.gym}>
                Su gimnasio {g.gymName} ha vendido este mes {g.salesNumber} servicios, por un total de {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARG'}).format(g.totalSales)}
                </div>
            })}
            </div>
            </div>
        </div>
    )
};