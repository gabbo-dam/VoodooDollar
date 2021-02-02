import React from 'react'
import styled from 'styled-components'
import Telegram from '../../../icons/telegram'
import Unicorn from '../../../icons/unicorn'
import Twitter from '../../../icons/twitter'
import Audit from '../../../icons/audit'
import Medium from '../../../icons/medium/index.jsx'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href="#"><Unicorn /></StyledLink>
      <StyledLink href="#"><Twitter /></StyledLink>
      <StyledLink href="#"><Telegram /></StyledLink>
      <StyledLink href="#"><Medium /></StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[400]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
`

export default Nav