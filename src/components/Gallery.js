import React, { useEffect, useRef, useState } from 'react';
import { images } from '../data/images';



//Funcionalidad Basica de la galería
const Gallery = () => {
  const [url, setUrl] = useState("bar-2178839_1920");
  const [title, setTitle] = useState("old travel");
  const [subtitle, setSubtitle] = useState("autentic bar");
  const [clipath, setClipath] = useState("");
  const [clipathText, setClipathText] = useState("");
    const observerRef = useRef(null);
  //const [style, setStyle] = useState();

  useEffect(() => {
      
      const handleIntersection = (entries, observer) => {
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgId = entry.target.id;

              let details = images.filter((image) => image.id === imgId);

            setTimeout(() => {            
              setUrl(imgId);
              setSubtitle(details[0].description);
              setTitle(details[0].name);
            }, 500);


             setClipath("clipath");
             setClipathText("clipathText");

             setTimeout(() => {
               setClipath("");
               setClipathText("");
             }, 1000);



            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      };
      const options = {
        root: null,
        rootMargin: "-390px ",
        threshold: 0.5,
      };

      observerRef.current = new IntersectionObserver(
        handleIntersection,
        options
      );

      const targets = document.querySelectorAll(".gallery__albumImg");
      targets.forEach((target) => {
        observerRef.current.observe(target);
      });

      return () => {
        observerRef.current.disconnect();
      };
    }, []);
 

    const handleClick = (e) => {
      console.log(e.target)
      const name = e.target.id;

      setClipath("clipath");
      setClipathText("clipathText");


      setTimeout(() => {
              
        setUrl(name);
        setClipath("")
        setClipathText("")

      }, 1000);
     

      
    
    };


  


  
 
  return (
    <>
      <div className="gallery">
        <div className="overflow">
          <div className="gallery__container container">
            <div className=" gallery__selectedImg">
              <div className={`gallery__description ${clipathText}`}>
                <h2 className="gallery__name">{title}</h2>
                <p className="gallery__detail">{subtitle}</p>
              </div>
              <div className={`gallery__img ${clipath}`}>
                <div className="screen show"></div>
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