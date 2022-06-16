import axios from "axios";

// Para ver la estructura de los objetos entrar en InfoForms.jsx
// Ver el id que se pasa en cada caso (no es el mismo)


//----------------------------------------------------------------------------
// Esta función sirve para crear un gym           
//----------------------------------------------------------------------------

export async function createOneGym(dataForNewGym) {
    // new Gym es el objeto que guarda toda la info para crear el nuevo gym
    
    const newGym = await axios({
        method: "post",
        url: "/api/partner/gyms/createOneGym",
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

//----------------------------------------------------------------------------
// Esta función sirve para editar la info de un gym       
//----------------------------------------------------------------------------

export async function editOneGym(dataForEditGym) {
    // new Gym es el objeto que guarda toda la info para editar el nuevo gym
    
    const editGym = await axios({
        method: "put",
        url: "/api/partner/gyms/editOneGym",
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

//----------------------------------------------------------------------------
// Esta función sirve para crear un nuevo servicio
//----------------------------------------------------------------------------

export async function createOneService(dataForNewService) {
    // new Gym es el objeto que guarda toda la info para crear el nuevo servicio

    const newService = await axios({
        method: "post",
        url: "/api/partner/services/createOneService",
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

//----------------------------------------------------------------------------
// Esta función sirve para editar un servicio creado
//----------------------------------------------------------------------------

export async function editOneService(dataForEditService) {
    // new Gym es el objeto que guarda toda la info para crear el nuevo servicio

    const editService = await axios({
        method: "put",
        url: "/api/partner/services/editOneService/",
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