import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useContext} from 'react'
import {Link} from "react-router-dom";
import { useOutletContext } from 'react-router-dom';
import ImageContext from '../context/ImageContext';
import './card.css'
import image from './utils';







const theme = createTheme();

export default function Album() {

    let img = useOutletContext()[0]
    let {deleteImage} = useContext(ImageContext)
    
    function error(e){
      e.target.src = image
    }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <main>
        {/* Hero unit */}
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {img.map(({id, description, name, image}) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                 <Link to={`image/${id}`} >

                

                 <CardMedia
                    component="img"
                    sx={{
                      pt: '0%',
                    }}
                    image={`http://127.0.0.1:8000/static${image}`}
                    alt="random"
                    onError={error}
                  />
                  </Link>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {name}
                    </Typography>
                    <Typography>
                      {description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                   <Link to={`image/${id}`} className="link"><Button size="small">View</Button></Link> 
                   <Link to={`edit/${id}`} className="link" ><Button size="small">Edit</Button></Link>   
                   <Link to={`history/${id}`} className="link" ><Button size="small">History</Button></Link>   
                   <Button size="small"
                   onClick={()=>deleteImage(id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}