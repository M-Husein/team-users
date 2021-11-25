// import { SyntheticEvent } from 'react';

import Btn from '../components/Btn';

type NavMainProps = {
  openAside?: boolean, 
  onOpenAside?: Function
}

export default function NavMain({
  openAside, 
  onOpenAside
}: NavMainProps){
  const onClickBtn = () => { // e: SyntheticEvent
    /* @ts-ignore */
    // document.activeElement.blur();
    // e.target.blur();
    onOpenAside && onOpenAside();
  }

  return (
    <nav 
      id="navMain" 
      className="pos-sticky t-0 shadow-1 bg-light" 
    >
      <div className="container d-flex a-items-center">
        <a href="/" className="nav-brand">
          <img alt="Logo" src="/media/img/logo/logo192.png" width="30" height="30" /> Team Users
        </a>
        {/* @ts-ignore */}
        <Btn 
          kind="primary" 
          className={"invisible py-1 ml-auto" + (openAside ? "" : " btnOpenAsideMain")} 
          onClick={onClickBtn} 
        >
          ☰
        </Btn>
      </div>
    </nav>
  );
}
