import React, {useRef, useEffect} from 'react';
import style from '../Slider/styles/Slider.module.css'
import benefits from '../images/benefits.jpg'
import benefits1 from '../images/benefits(1).jpg'


export default function Slider() {
    const slideshow = useRef(null)                                             //se guarda dentro de current!
    const intervalSlideShow = useRef(null)

    const next = () =>{
        if (slideshow.current.children.length > 0){
            
            const firstElement = slideshow.current.children[0];
            //transicion
            slideshow.current.style.transition = `500ms ease-out all`
            //obtengo tamaño
            const sizeSlide = slideshow.current.children[0].offsetWidth;
            slideshow.current.style.transform = `translateX(-${sizeSlide}px)`

            const transition = () => {
            //reinicio posicion
            slideshow.current.style.transition = 'none';
            slideshow.current.style.transform = `translateX(0)`;
            slideshow.current.appendChild(firstElement)
            slideshow.current.removeEventListener('transitionend', transition)
            }
            //event para cuando termina la animacion
            slideshow.current.addEventListener('transitionend', transition)
        }
    }

    useEffect(() =>{
     intervalSlideShow.current = setInterval(() => {
           next()
        }, 6000)
  
        slideshow.current.addEventListener('mouseenter', () =>{ 
            clearInterval(intervalSlideShow.current)
        });
        slideshow.current.addEventListener('mouseleave', () =>{ 
            intervalSlideShow.current = setInterval(() => {
                next()
             }, 6000)
        })
},[]) 

    return(
     <div className={style.containP}>
         <div className={style.containSlideShow} ref={slideshow}>
         <div className={style.slide}> <img src={benefits} alt= '' /></div>
         <div className={style.slide}> <img src={benefits1} alt= '' /></div>
         </div>
     </div>
    )
}
