import styled from 'styled-components';

interface ScratchCardProps {
    $width: string;
    $height: string;
  }
  
  const ScratchCard = styled.div<ScratchCardProps>`
    width: ${props => props.$width};
    height: ${props => props.$height};
  `;