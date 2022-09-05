import { createContext, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const ImageContext = createContext();

export default ImageContext;

export const ImageProvider = ({children}) =>{
    const navigate = useNavigate()
    const [img, setImg] = useState([])
    const [update , setUpdate] = useState([])
    
    useEffect(()=>{
        getImages()
    },[update])
    
    const getImages = async () =>{
        const response = await fetch("http://127.0.0.1:8000/")
        const data = await response.json() 
        setImg([...data])
    }

    const deleteImage = async (id) =>{
        const response = await fetch(`http://127.0.0.1:8000/deleteimage/${id}`)
        // const data = await response.json()
        // if(data.message == "invalid"){
        //   await setUpdate([])
        //   await alert("Please add an image")
        //   return 
        // }
        await alert("Image has been deleted..")
        setUpdate([])

    }

    function updater(url, data){
    fetch(url,
      {
        method:'POST',
        body:data
      }).then(response => response.json()).then(res =>{
        if(res.message == "success"){
          alert("Image has been added successfully")
          setUpdate([])
          navigate("/")
        }
        else{
          alert("Please add an image..")
        }
      })
    }

    let contextData = { 
        cards:img,
        deleteImage:deleteImage,
        updater:updater
    }
    return (
        <ImageContext.Provider value={contextData}>
            {children}
        </ImageContext.Provider>
    )

}