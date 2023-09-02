import React, { useEffect, useRef, useState } from 'react';
import { images } from '../data/images';



//Funcionalidad Basica de la galería
const Gallery = () => {
  const [url, setUrl] = useState("bar-2178839_1920");
  const [title, setTitle] = useState("old travel");
  const [subtitle, setSubtitle] = useState("autentic bar");
  //const [style, setStyle] = useState();
 

    const handleClick = (e) => {
      console.log(e.target)
      const name = e.target.id;

      setTimeout(() => {
         setUrl(name);
      }, 800);
     

      let details = images.filter((image) => image.id === name);
      setSubtitle(details[0].description);
      setTitle(details[0].name);
    
    };


  const observerRef = useRef(null);

  useEffect(() => {
     const handleIntersection = (entries, observer) => {
       entries.forEach((entry) => {
         if (entry.isIntersecting) {
           
             const imgId = entry.target.id;
            

             let details = images.filter((image) => image.id === imgId);
             setSubtitle(details[0].description);
           setTitle(details[0].name);
           const divImg = document.querySelector(".screen")
           divImg.classList.add("show")
           
           setTimeout(() => {
             setUrl(imgId);
             
              const divImg = document.querySelector(".screen");
              divImg.classList.remove("show");
           }, 800);
      
         
           entry.target.classList.add("visible");
           
         } else {
           // Aquí puedes realizar acciones cuando el elemento ya no es visible
           // Por ejemplo, eliminar la clase CSS para ocultar animaciones
           entry.target.classList.remove("visible");
         }
       });
     };
    const options = {
      root: null,
      rootMargin: "-390px ",
      threshold: 0.5, // Ajusta este valor según tus necesidades
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
  
    // Observa cada elemento con la clase 'gallery__albumImg'
    const targets = document.querySelectorAll(".gallery__albumImg");
    targets.forEach((target) => {
      observerRef.current.observe(target);
    });

    // Detén la observación cuando el componente se desmonte
    return () => {
      observerRef.current.disconnect();
    };
  }, []);
  
 
  return (
    <>
      <div className="gallery">
        <div className="overflow">
          <div className="gallery__container container">
            <div className= " gallery__selectedImg">
              <div className="gallery__description">
                <h2 className="gallery__name">{title}</h2>
                <p className="gallery__detail">{subtitle}</p>
              </div>
              <div className="gallery__img">
                <div className='screen show'></div>
                <img
                  className="gallery__selected"
                  alt="img"
                  src={"/images/" + url + ".jpg"}
                />
              </div>
            </div>
            <div className="gallery__album">
              {images.map((image, i) => {
                return (
                  <a
                    ref={observerRef}
                    href={"#" + image.id}
                    onClick={handleClick}
                    id={image.id}
                    key={image.id}
                    className="gallery__albumImg"
                  >
                    <img
                      alt="images"
                      className="gallery__jpg"
                      src={"/images/" + image.id + ".jpg"}
                    />
                  </a>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery