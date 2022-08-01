import React from "react";
import img from "../../asets/images/benefits(uf).jpg";
import img2 from "../../asets/images/benefits(uf)2.jpg";
import img3 from "../../asets/images/benefits(uf)3.jpeg";
import style from "../LegendUf/style/LegendUf.module.css";
import { ButtonSecondaryDeslice } from "../../helpers/Buttons/Buttons.jsx";
import { useNavigate } from "react-router-dom";
import { ScrollContainer, Animator, ScrollPage, Fade, Zoom, Move } from 'react-scroll-motion';

export default function LegendUf() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");

  const type = localStorage.getItem("type");

  const idUser = localStorage.getItem("userId");

  const avatar = localStorage.getItem("avatar");

  const Scrll0 =  Fade()
  const Scrll1 = Zoom(0, 1)
  const Scrll2 = Fade()
  const Scrll3 = Move(600, 0)

  return (
    <div>
    <ScrollContainer>
      <ScrollPage page={0}>
            <Animator animation={Scrll0}>
      <div className={style.containerFullLegend}>
        <div className={style.img}>
          <img src={img} alt="" />
        </div>

        <div className={style.containerLegendText}>
          <h3 style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "3rem" }}>
            Nuestro propósito es facilitar el acceso a la práctica de actividad
            física de alta calidad, al mismo tiempo brindarte una manera fácil y
            segura de organizar tu agenda de actividades y tus objetivos de manera
            personalizada!
            <br key="br1" />
            <br key="br2" />
            En un solo lugar, podrás ver todas las posibilidades y elegir el
            gimnasio que mejor se adapte a tu perfil deportivo y ubicación!
            <br key="br3" />
            <br key="br4" />
            Podrás elegir inscribirte de forma mensual o tambien optar por tomar
            clases individuales, abonando de forma segura y sin moverte de tu
            casa!
          </h3>


        </div>

      </div>
      </Animator>
      </ScrollPage>
      
      <ScrollPage page={1}>
            <Animator animation={Scrll1}>
      <div className={style.containerFullLegend}>
        <div className={style.containerLegendText}>
          <h2>Beneficios del ejercicio Fisico</h2>
        <br key="br5" />
        <br key="br6" />
          <h3 style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "3rem" }}>
            La actividad física regular puede mejorar la fuerza muscular y aumentar la
            resistencia. El ejercicio suministra oxígeno y nutrientes a los tejidos y
            ayuda a que el sistema cardiovascular funcione de manera más eficiente.
            Y cuando tu salud cardíaca y pulmonar mejora, tienes más energía para
            hacer las tareas diarias.
          </h3>
        </div>
        <div className={style.img}>
          <img src={img2} alt="" />
        </div>
        
      </div>
      </Animator>
      </ScrollPage>
      <ScrollPage page={2}>
            <Animator animation={Scrll2}>
      <div className={style.containerFullLegend}>
        <div className={style.containerLegendText}>
          <h2>
          <Animator animation={Move(400,0)}>¡ Nutre tu mente y espiritu !</Animator>
          </h2>
          <br key="br7" />
        <Animator animation={Move(-650, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Libera las hormonas de la felicidad</li>
          </Animator>
          <Animator animation={Move(-600, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Alivia y reduce el estrés</li>
          </Animator>
          <Animator animation={Move(-550, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Mejora las relaciones sociales</li>
          </Animator>
          <Animator animation={Move(-500, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumenta la autoestima</li>
          </Animator>
          <Animator animation={Move(-450, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Ralentiza y previene el deterioro cognitivo</li>
          </Animator>
          <Animator animation={Move(-400, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumento de la memoria</li>
          </Animator>
          <Animator animation={Move(-350, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Combate los trastornos del sueño: insomnio y somnolencia</li>
          </Animator>
          <Animator animation={Move(-300, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Ayuda a controlar las adicciones</li>
          </Animator>
          <Animator animation={Move(-250, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumenta de la capacidad cerebral</li>
          </Animator>
          <Animator animation={Move(-200, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumenta la productividad</li>
          </Animator>
          <Animator animation={Move(-150, 0)}>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumenta nuestra capacidad de concentración</li>
          </Animator>
          </div>
        <div className={style.img}>
        <Animator animation={Scrll3}>
          <img src={img3} alt="" />
          </Animator>
        </div>
      </div>
       </Animator>
      </ScrollPage>
      <ScrollPage page={3}>
            <Animator animation={Scrll1}>
      <div>
      <h2 style={{ color: "var(--color-prim)", marginTop: "1.5rem", display:"flex", justifyContent: "center"}}>
        <Animator animation={Scrll3}>
        {!idUser
            ? "Que esperas para formar parte de la evolucion del mundo deportivo ?"
            : "Ya formas parte de la evolucion deportiva!"}
        </Animator>
         
        </h2>
        <div style={{ marginTop: "5rem", display:"flex", justifyContent: "center" }}>
          {!idUser ? (
            <ButtonSecondaryDeslice
              title="Registrate"
              padding=".7rem 4rem"
              onClick={() => navigate("/register")}
            />
          ) : (
            <ButtonSecondaryDeslice
              title="Ir a Home"
              padding=".7rem 4rem"
              onClick={() =>
                navigate(`/home/${type}/${name}/${idUser}/${avatar}}`)
              }
            />
          )}
        </div>
        </div>
        </Animator>
      </ScrollPage> 
        </ScrollContainer>
    </div>
  );
}
