'use client'

import { createTheme } from '@mui/material/styles';
import {green, red} from "@mui/material/colors";

const customTheme =createTheme({
  // Color Custom
  palette: {
    primary: {
      main: green[900]
    }
  },
  // Breakpoints
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  // Typography Custom
    typography: {
      button: {
       '@media (min-width:600px)': {
          fontSize: '50px',
          color: red[300]
       }
      }
    }

})

export default customTheme
