import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios'
// alerta personalizada
import { SweetAlrt } from "../asets/helpers/sweetalert";


export const useLogin = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        let userLogin = {}

        if (username && password) {
            userLogin = { username: username, password: password }

            const login = await axios({
                method: 'POST',
                url: '/api/service/login',
                data: userLogin,
                headers: { "X-Requested-With": "XMLHttpRequest" }
            }).then((res) => {
                return res.data;
            }).catch((error) => console.log(error));

            if (login.login) {

                let { userId, name, type, avatar, active, latitude, longitude } = login;

                if (active === true) {

                    if (!login.avatar) {
                        localStorage.setItem("userId", userId);
                        localStorage.setItem("name", name);
                        localStorage.setItem("type", type);
                        localStorage.setItem("latitude", latitude.$numberDecimal);
                        localStorage.setItem("longitude", longitude.$numberDecimal);

                        navigate(`/home/${type}/${name}/${userId}`);
                    }

                    if (login.avatar) {
                        localStorage.setItem("userId", userId);
                        localStorage.setItem("name", name);
                        localStorage.setItem("type", type);
                        localStorage.setItem("avatar", avatar._id);
                        localStorage.setItem("latitude", latitude.$numberDecimal);
                        localStorage.setItem("longitude", longitude.$numberDecimal);

                        let avatarId = avatar._id;

                        navigate(`/home/${type}/${name}/${userId}/${avatarId}`);
                    }
                } else {
                    setError('Cuenta inactiva, verificacion de email pendiente')
                }
            }
            if (typeof login === 'string') {
                SweetAlrt(login)
                setPassword('')
                setUsername('')
            }
        }
        if (!username && password) {
            setError('No olvide introducir su email')
        }
        if (username && !password) {
            setError('No olvide introducir su contraseña')
        }
    }

    return {
        onSubmit,
        error,
        username,
        setUsername,
        password,
        setPassword
    }
}

export default useLogin;