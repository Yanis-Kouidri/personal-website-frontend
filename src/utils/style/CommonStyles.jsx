import styled, { keyframes } from 'styled-components'
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

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
`

export const StyledInput = styled.input`
  padding: 0.1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`
export const StyledSubmitButton = styled.button`
  padding: 0.6rem;
  font-size: 1rem;
  color: white;
  background-color: ${colors.secondary};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primary};
  }
`

const StyledMessage = styled.p`
  font-size: 1.1rem;
`

export const StyledErrorMessage = styled(StyledMessage)`
  color: #b30808;
`

export const StyledSuccessMessage = styled(StyledMessage)`
  color: #0d9e03;
`
