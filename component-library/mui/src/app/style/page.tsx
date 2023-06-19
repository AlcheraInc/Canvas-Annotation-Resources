'use client'

import * as React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import emotionStyled from '@emotion/styled'
// import theme from '../../theme';

export default function Style() {
  return (
    <div>
      {/*default styles*/}
      <Button sx={{ width: '200px' }} color="primary" variant="contained">버튼</Button>
       {/*Mui stlyed Custom*/}
      <MuiStyledButton>테스트</MuiStyledButton>
      {/*// Mui with emotion Styled*/}
      <MuiCustomButton>Emotion + Mui Custom</MuiCustomButton>
      {/*// emotion*/}
      <EmotionCustomButton width={'100px'}>Emotion 커스텀 버튼</EmotionCustomButton>
    </div>
  )
}

type ButtonProps = {
  width: string,
}
// emotion
const EmotionCustomButton = emotionStyled.button<ButtonProps>`
  color: 'red',
  width: ${props => props.width}
`
const MuiCustomButton = emotionStyled(Button)`
  color: black;
  background-color: red;
`

  const MuiStyledButton = styled('button')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
    width: '100px',
}));


