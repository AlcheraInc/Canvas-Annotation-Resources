'use client'

import { createTheme } from '@mui/material/styles';
import {green} from "@mui/material/colors";

const customTheme =createTheme({
  // Color Custom
  palette: {
    primary: {
      main: green[900]
    }
  },
  // Typography Custom
    typography: {
      button: {
       '@media (min-width:600px)': {
        fontSize: '20px'
       }
      }
    }

})

export default customTheme
