import React, { useEffect } from "react";
import styles from './styles/Incomes.module.css'
import { Bar } from 'react-chartjs-2';
import { getCart, getMySales, getUser } from "../../redux/actions";
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

export default function ClientsGraph() {

  let { userId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySales(userId))// eslint-disable-next-line
    dispatch(getCart())
  }, [userId])

  const cart = useSelector((state) => state.allCart)
  const partnerGyms = useSelector((state) => state.user);

  console.log('partnergyms', partnerGyms.gyms)


  const saless = cart.filter(st => st.status === 'Payed')
    .filter(g => g.gyms ? g : null)
  // .filter(clien => (clien.gyms._id==partnerGyms.gyms.map(a=>a._id))?clien:null)
  console.log('clients', saless)

  const partnerClients = []


  for (let i = 0; i < partnerGyms.gyms.length; i++) {
    for (let j = 0; j < saless.length; j++) {
      if (saless[j].gyms._id === partnerGyms.gyms[i]._id) {
        partnerClients.push(saless[j])
      }
    }
  }
  console.log('partnerClients', partnerClients)
  const clientsUnique = [...new Set(partnerClients)]


  let newObject = clientsUnique.map((c) => {
    return {
      gymId: c.gyms.name,
      userId: c.user._id
    }
  })
  console.log(newObject, 'el nuevo array de clientes únicos')
  let resul = []

  for (var i = 0; i < newObject.length; i++) {
    if (!resul[newObject[i].gymId]) {
      console.log(newObject[i].gymId)
      resul[newObject[i].gymId] = [newObject[i].userId]

    } else {
      if (!resul[newObject[i].gymId].includes(newObject[i].userId)) {
        resul[newObject[i].gymId].push(newObject[i].userId)
      }

    }

  }
  console.log(resul, 'luego de un ardo trabajo')

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = partnerClients.map(gy => gy.gyms.name).filter((k, index, array) => {
    return index === array.indexOf(k)
});  
//   const qtys = partnerClients.map(gy => gy..name).filter((k, index, array) => {
//     return index === array.indexOf(k)
// });  
//   const ddata = partnerClients.filter((p,i) =>p.user.name==='Fernando'?+1:0)
//   console.log('data', ddata)

  const data = {
    labels,
    datasets: [
      {
        label: 'Clientes por gimnasio',
        data: labels.map(()=>Math.ceil(Math.random()*25)),
        // .filter((k, index, array) => {return index === array.indexOf(k)}),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />;
    </div>
  )

};