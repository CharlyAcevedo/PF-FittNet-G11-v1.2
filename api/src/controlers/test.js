const mongoose = require('mongoose');
const Diseases = require('../models/Diseases')

async function run() {
    try {
        const newUser = await Diseases.create({
            desease: "artritis",
            trainlimits: "Caminar.Ciclismo.Natación.Deportes en equipo.Danza aeróbica.Levantamiento de peso.Ejercicios de la banda de resistencia.Calistenia.",
            considerations: "La presencia de cetonas indica que su cuerpo no tiene suficiente insulina para poder controlar el nivel de azúcar en la sangre. Si hace actividad física cuando su nivel de cetonas está alto, corre el riesgo de tener cetoacidosis, una complicación grave de la diabetes que requiere tratamiento inmediato.",
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        {
            desease: "hipertension",
            trainlimits: "Caminar.Ciclismo.Ejercicios de la banda de resistencia.Calistenia.",
            considerations: "La presencia de cetonas indica que su cuerpo no tiene suficiente insulina para poder controlar el nivel de azúcar en la sangre. Si hace actividad física cuando su nivel de cetonas está alto, corre el riesgo de tener cetoacidosis, una complicación grave de la diabetes que requiere tratamiento inmediato.",
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        {
            desease: "cancer",
            trainlimits: "Caminar.Ciclismo.Natación.Deportes en equipo.Ejercicios de la banda de resistencia.Calistenia.",
            considerations: "La presencia de cetonas indica que su cuerpo no tiene suficiente insulina para poder controlar el nivel de azúcar en la sangre. Si hace actividad física cuando su nivel de cetonas está alto, corre el riesgo de tener cetoacidosis, una complicación grave de la diabetes que requiere tratamiento inmediato.",
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        {
            desease: "tuberculosis",
            trainlimits: "Deportes en equipo.Danza aeróbica.Levantamiento de peso.Ejercicios de la banda de resistencia.Calistenia.",
            considerations: "La presencia de cetonas indica que su cuerpo no tiene suficiente insulina para poder controlar el nivel de azúcar en la sangre. Si hace actividad física cuando su nivel de cetonas está alto, corre el riesgo de tener cetoacidosis, una complicación grave de la diabetes que requiere tratamiento inmediato.",
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        }
        )
        return newUser
        console.log(newUser)
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = run
