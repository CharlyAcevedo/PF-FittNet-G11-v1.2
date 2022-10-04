import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import jwt_decode from "jwt-decode";

import { getPartnerDetails } from '../redux/actions'
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const useLoginGoogle = () => {

    const token = localStorage.getItem('token')

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userId = localStorage.getItem('userId')

    const handleCallbackGoogle = async (response) => {
        const userObject = jwt_decode(response.credential)
        if (!token || !userId) {
            const googleData = await axios.post(`api/service/google/auth`, {
                tokenId: response.credential,
                data: userObject
            });

            const finalizacionData = await googleData.data;

            localStorage.setItem('token', response.credential);
            document.getElementById('signInDiv').hidden = true;

            localStorage.setItem("userId", finalizacionData.user.userId);
            localStorage.setItem("type", finalizacionData.user.type);
            localStorage.setItem("avatar", finalizacionData.user.avatar);
            localStorage.setItem("name", finalizacionData.usuario.name);
            localStorage.setItem("email", finalizacionData.usuario.email);

            const { avatar } = finalizacionData.usuario;

            if (finalizacionData.usuario.type === "partner") {
                dispatch(getPartnerDetails(userId))
            }


            if (!avatar) {
                navigate(`/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}`)
            } else {
                navigate(
                    `/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}/${finalizacionData.usuario.avatar}`
                );
            }
        } else {
            navigate('/');
        }
    }

    useEffect(() => {
        window.google?.accounts.id.initialize({
            client_id: '157510772086-98ehfc8l140rpqoer006k78qugr3e62l.apps.googleusercontent.com',
            callback: handleCallbackGoogle,
        })

        window.google?.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { 
                theme: "outline",
                size: "large",
                shape: "circle"
            }
        )
    }, [])




    return {
        handleCallbackGoogle
    }
}

export default useLoginGoogle