const mongoose = require('mongoose');
const Diseases = require('../models/Diseases')
const DiseasesType = require('../models/DiseasesType')

async function run() {
    try {
        const newUser = await DiseasesType.create(
        {
            deseaseName: "enfermedad cardiaca",
            benefits: "El ejercicio regular puede ayudar a mejorar la salud de tu corazón. Estudios recientes han demostrado que el entrenamiento interválico a menudo se tolera bien en personas con enfermedad cardíaca y puede producir beneficios significativos. Para las personas con hipertensión arterial, el ejercicio puede reducir el riesgo de morir de enfermedad cardíaca y disminuir el riesgo de que la enfermedad cardíaca progrese.",
            
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        {
            deseaseName: "diabetes",
            benefits: "El ejercicio regular puede ayudar a que la insulina reduzca de manera más eficaz tu nivel de azúcar en la sangre. La actividad física también puede ayudarte a controlar el peso y aumentar tu energía. Si tienes diabetes tipo 2, el ejercicio puede reducir tu riesgo de morir de enfermedad cardíaca.",
            
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        {
            deseaseName: "asma",
            benefits: "Con frecuencia el ejercicio puede ayudar a controlar la frecuencia y gravedad de los ataques de asma.",
            
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        {
            deseaseName: "dolor de espalda",
            benefits: "Las actividades aeróbicas regulares de bajo impacto pueden aumentar la fuerza y la resistencia de la espalda y mejorar la función muscular. Los ejercicios para los músculos abdominales y de la espalda (ejercicios de fortalecimiento del tronco) pueden ayudar a reducir los síntomas al fortalecer los músculos que rodean la columna vertebral.",
            
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        {
            deseaseName: "artritis",
            benefits: "El ejercicio puede reducir el dolor, ayudar a mantener la fuerza muscular en las articulaciones afectadas y reducir la rigidez articular. También puede mejorar la función física y la calidad de vida de las personas que tienen artritis.",
            
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        {
            deseaseName: "cancer",
            benefits: "El ejercicio puede mejorar la calidad de vida de las personas que han tenido cáncer y también puede mejorar su estado físico. El ejercicio también puede reducir el riesgo de morir de cáncer de mama, colorrectal y de próstata.",
            
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },{
            deseaseName: "demencia",
            benefits: "El ejercicio puede mejorar la cognición en personas con demencia, y las personas que son activas de forma regular tienen menos riesgo de demencia y deterioro cognitivo.",
            
            //email: "charlyacevedadasdsadsado@hotmail.com", 
            // address: {
            //     street: "calle 20",
            //     city: "mexico"
            // }           
        },
        )
        return newUser
        console.log(newUser)
    } catch (error) {
        console.log(error.message)
    }
} 



/* async function run(id) {
    try {
        const deleteDesease = await Diseases.findByIdAndDelete(id)
        console.log(deleteDesease)
    } catch (error) {
        console.log(error.message)
        return error.message
    }
} */


module.exports = run
