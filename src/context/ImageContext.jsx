import { createContext, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';


const ImageContext = createContext() 

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
        await fetch(`http://127.0.0.1:8000/deleteimage/${id}`)
        await setUpdate([])
        await alert("Image has been deleted!..")

    }

    function updater(url, data){
        console.log("this is the url",url)
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
      })
    }
    console.log("calling", img)
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