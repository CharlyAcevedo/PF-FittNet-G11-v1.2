import axios from "axios";


export async function createGym(dataForNewGym) {
    // new Gym es el objeto que guarda toda la info para crear el nuevo gym
    
    const newGym = await axios({
        method: "post",
        url: "/api/service/login",
        data: dataForNewGym,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => console.log(error));

    console.log(newGym, 'cuando crea el gym');

    if (newGym) return true;
    if (!newGym) return false;

}

export async function editGym(dataForEditGym) {
    // new Gym es el objeto que guarda toda la info para editar el nuevo gym
    
    const editGym = await axios({
        method: "put",
        url: "/api/service/login",
        data: dataForEditGym,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => console.log(error));

    console.log(editGym, 'cuando edita el gym');

    if (editGym) return true;
    if (!editGym) return false;

}

export async function createService(dataForNewService) {
    // new Gym es el objeto que guarda toda la info para crear el nuevo servicio

    const newService = await axios({
        method: "put",
        url: "/api/service/login",
        data: dataForNewService,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => console.log(error));

    console.log(newService, 'cuando crea el service');

    if (newService) return true;
    if (!newService) return false;

}


export async function editService(dataForEditService) {
    // new Gym es el objeto que guarda toda la info para crear el nuevo servicio

    const editService = await axios({
        method: "put",
        url: "/api/service/login",
        data: dataForEditService,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => console.log(error));

    console.log(editService, 'cuando edita el service');

    if (editService) return true;
    if (!editService) return false;

}