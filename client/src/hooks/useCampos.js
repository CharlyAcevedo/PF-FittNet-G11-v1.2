import { useState } from "react";


export const useCampos = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("");

    // enviamos nuestros estados
    return {
        name,
        setName,
        email,
        password,
        setEmail,
        setPassword,
        type,
        setType,
    }
}