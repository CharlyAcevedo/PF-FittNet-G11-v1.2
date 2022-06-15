import React, { useEffect } from "react";
import styles from './styles/Incomes.module.css'
import { getAllSales, getUser } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';
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

export default function IncomesAdmin(){

  let { userId } = useParams();
    
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser(userId))
    dispatch(getAllSales(userId))// eslint-disable-next-line
  },[])

  
  const mySales = useSelector((state) => state.adminSales)
  const userData = useSelector((state) => state.user)
  console.log(mySales)
  let counter = 0;
  let colorArray = [ "#ff004c", "#fe5889", "#fb6d10", "#ff9550", "#572e13"];
  
  const myDataSets = typeof mySales === "object" && Object.entries(mySales).length > 0  ?
  mySales.salesPreGym.map((g) => {
    let dataSet = {
      label: g.gymName,
      backgroundColor: colorArray[counter],
      bordercolor: colorArray[counter],
      borderWhidth: 1,
      hoverBackgroundColor: colorArray[counter]+45,
      hoverBordercolor: colorArray[counter]+45,
      data: [g.totalSales/1000, g.salesNumber ],
    };
    counter = counter < 5 ? counter + 1 : 0;
    return dataSet
  }) : [{
    label: "loading...",
    backgroundColor: "#ff2767",
    bordercolor: "#ff2767",
    borderWhidth: 1,
    hoverBackgroundColor: "#ff276745",
    hoverBordercolor: "#ff276745",
    data: [0]
}]

    const data = {
        labels: ["Ganancias en Miles", "Ventas"],
        datasets: myDataSets,        
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

      const totalIncomes = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARG'}).format(mySales.totalSales)

    return (
        <div className={styles.mainContainer}>
          <div className={styles.graphContainer}>
            <h2>Grafica por Ingresos</h2>
            <div className={styles.doubleContainer}>
              <div className={styles.doubleContainer}>
                <Bar  data={data} options={options}/>
              </div>
            </div>
            <br />
            <div >
            <h5>Estimado {userData.name} este es el desgloce de los ingresos de Fittnet</h5>
            <p>Sus ganancias totales Fittnet son de {totalIncomes}</p>
            <p>Con un total de {mySales.salesNumber} ventas en todos los gimnasios</p>
            {typeof mySales === "object" && Object.entries(mySales).length > 0 ? mySales.salesPreGym.map((g) => {
              return <div key={g.gym}>
                Su gimnasio {g.gymName} ha vendido este mes {g.salesNumber} servicios, por un total de {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARG'}).format(g.totalSales)}
                </div>
            }) : <div>Loading...</div>}
            </div>
            </div>
        </div>
    )
};