import {useParams} from "react-router-dom";
import { useContext,useEffect,useState } from "react";
import ImageContext from "../context/ImageContext";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import image from "../components/utils"



export default function Image() {
    const {cards} = useContext(ImageContext) 
  const {pk} = useParams()
  const [img, setImg] = useState({
    name:null,
    description:null,
    image:null
  })

  useEffect(()=>{
    cards.map(({id,name, description, image})=>{
    if(id == pk){
        setImg(
            {
            name:name,
            description:description,
            image : image
            })
    }
  })
  },[cards])

  function update(e){
    e.target.src = image
  }

  return (
    <>
    <Box display="flex" justifyContent="center"
    alignItems="center" minHeight="100vh"> 
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          // height="500"
          // width="500"
          image={`http://127.0.0.1:8000/static${img.image}`}
          onError={update}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {img.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {img.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Box>
    </>
  );
}


