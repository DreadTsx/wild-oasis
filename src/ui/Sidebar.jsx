import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useSidebar } from "../context/SidebarContext";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 1099px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1100;
    width: min(28rem, 80vw);
    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
    transition: transform 0.3s ease-in-out;
    box-shadow: var(--shadow-lg);
  }
`;

const Backdrop = styled.div`
  display: none;

  @media (max-width: 1099px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1099;
  }
`;

const CloseButton = styled.button`
  display: none;

  @media (max-width: 1099px) {
    display: block;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);

    &:hover {
      background-color: var(--color-grey-100);
    }

    & svg {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--color-grey-500);
    }
  }
`;

function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      <Backdrop $isOpen={isOpen} onClick={close} />
      <StyledSidebar $isOpen={isOpen}>
        <CloseButton onClick={close} aria-label="Close menu">
          <HiXMark />
        </CloseButton>
        <Logo />
        <MainNav />
      </StyledSidebar>
    </>
  );
}

export default Sidebar;
