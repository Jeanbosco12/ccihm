import React, { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { ColorModeContext } from '../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { makeStyles } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const [showForm, setShowForm] = useState(false);
  const [showForme, setShowForme] = useState(false);
  const [register, setRegister] = useState({
    email: '',
    password: '',
    pseudo: '',
    type: 'utilisateur',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleSubmite = async (event) => {
    event.preventDefault();
    if (register.password === confirmPassword) {
      axios.post('http://localhost:8080/register', register).then((response) => {
        console.log(response);
        if (response.data.code === 'ER_PARSE_ERROR') {
          Swal.fire({ title: '', text: '', icon: 'error' });
        } else {
          Swal.fire({ title: '', text: '', icon: 'success' });
        }
      });
    } else {
      Swal.fire({ title: 'Echoué!', text: 'Les mots de passe doit être identique.', icon: 'error' });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/login', login).then((response) => {
      if (response.data.code === 'ER_PARSE_ERROR') {
        Swal.fire({ title: '', text: '', icon: 'error' });
      } else if (response.data[0].Nbre === 1) {
        Swal.fire({ title: 'Reussi!', text: 'Vous vous diriger vers la page d\'accueil.', icon: 'success' });
        console.log(response);
        sessionStorage.setItem('user', JSON.stringify(login));
        navigate('/accueil');
      } else {
        Swal.fire({ title: 'Connexion refusé', text: '', icon: 'error' });
        console.log(response);
      }
    });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowForm(true);
    setShowForme(false);
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    setShowForme(true);
    setShowForm(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setShowForme(false);
    setShowForm(false);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        p={1}
        className="header"
        sx={{
          backgroundColor: colorMode.theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
          color: colorMode.theme.palette.mode === 'dark' ? '#fff' : '#000',
        }}
      >
        {/* Societe */}
        <Box display="flex" borderRadius="3px">
          <IconButton sx={{ p: 1 }} disabled>
            <img src={require('../asset/img/ccilogo.jfif')} alt="logo" width={'40px'} /> Haute-Matsiatra
          </IconButton>
        </Box>

        {/* Tabulation droite */}
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <PersonOutlinedIcon OnClick={handleLoginClick} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default Home;