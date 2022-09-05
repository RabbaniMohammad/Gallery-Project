import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useContext } from 'react';
import ImageContext from '../context/ImageContext';



const theme = createTheme();

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function SignInSide() {
  const {pk} = useParams();
  let [add_p, setAdd_p] = useState(true)
  const {cards, updater} = useContext(ImageContext)


  const [images,setImage]=useState();
  const [data, setData] = useState({
      name:"",
      description:"",
      image:""
  })
  
    const url = `http://127.0.0.1:8000/updateimage/${pk}`

    const onImage=(e)=>{
        setImage(e.target.files[0]);
        setAdd_p(false)
    }

    useEffect(()=>{
        cards.map(ele=>{
            if(ele.id == pk){
                setData({
                    name:ele.name,
                    description:ele.description,
                    image:ele.image
                })
            }
        })
    },[cards])

    function updation(e){
      setData({...data, [e.target.name]:e.target.value})
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", event.target.name.value)
    data.append("description", event.target.description.value)
    try{
      data.append('image',images,images.name);
      data.append('image_name', images.name)
    }
    catch{
      data.append("update","yes")
      if(!event.target.check.checked){
        alert("You are not providing any image. Your older image will be deleted. Please check the box.")
        return
      }
    }

    updater(url, data)
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${data.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={data.name}
                onChange={updation}
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                value={data.description}
                onChange={updation}
                type="text"
                id="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="file"
                name="image"
                onChange={onImage}
                autoComplete="name"
                autoFocus
              />
              {add_p ?
                <p> <Checkbox {...label} value="1" name="check" />Do you want to delete your older image</p>:null
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}