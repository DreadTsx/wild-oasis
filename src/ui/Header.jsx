import styled from "styled-components";
import { HiBars3 } from "react-icons/hi2";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { useSidebar } from "../context/SidebarContext";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1099px) {
    padding: 1.2rem 2.4rem;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    padding: 1.2rem 1.6rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);

  @media (max-width: 1099px) {
    display: block;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const RightGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function Header() {
  const { toggle } = useSidebar();

  return (
    <StyledHeader>
      <MenuButton onClick={toggle} aria-label="Open menu">
        <HiBars3 />
      </MenuButton>
      <RightGroup>
        <UserAvatar />
        <HeaderMenu />
      </RightGroup>
    </StyledHeader>
  );
}

export default Header;
