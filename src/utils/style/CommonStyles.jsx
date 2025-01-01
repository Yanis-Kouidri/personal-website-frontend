import styled, { keyframes } from "styled-components"
import colors from './colors'

export const BasicH2Title = styled.h2`
  font-size: 38px;
`

export const BasicWrapper = styled.div`
  padding: 0px 50px 0px 50px;
`

export const InBuildingImg = styled.img`
  height: 300px;
`

export const InBuildingWrapper = styled.div`
  text-align: center;
`


 
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
    transform: rotate(360deg);
    }
`
 
export const Loader = styled.div`
    padding: 10px;
    border: 6px solid ${colors.primary};
    border-bottom-color: transparent;
    border-radius: 22px;
    animation: ${rotate} 1s infinite linear;
    height: 0;
    width: 0;
`
