import React from "react"




// Necesito un form con un input, un botón de agregar y otro de quitar
// Necesito una lista los correos baneados 

export default function BlockAccount() {
    return (       
        <div>
            <h3>Qué necesito para banear una cuenta?</h3>
            <p>Listo - Necesito un modelo en la base de datos</p>
            <p>Listo - Necesito una ruta y una acción para agregar y para quitar cuentas</p>
            <p>2 - Necesito ver la lista de correos baneados</p>
            <p>3 - Necesito agregar y quitar correos al modelo</p>
            <p>4 - Necesito un formulario y un botón para quitar</p>
            <p>6 - Necesito verificar los correos a la hora de crear una nueva cuenta</p>
            <p>7 - También podría verifiar las cuenta al momento de iniciar sesión</p>
        </div>
    )

}