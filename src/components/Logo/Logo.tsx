import React from 'react';
import styled from 'styled-components';

import farmer from '../../assets/img/farmer.png';
import VoodooDollar from '../../icons/voodoodollar'

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <VoodooDollar src={farmer} height="40" style={{ marginTop: -4 }}/>
      <StyledLink href="/">Voodoo Dollar</StyledLink>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[100]};
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  margin-left: ${(props) => props.theme.spacing[2]}px;
`;

export default Logo;
