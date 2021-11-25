import { AUTHOR, EXTERNAL_LINKS } from "../const/INFOS";
import Btn from '../components/Btn';
import { ReactComponent as InfoIcon } from '../svg/info.svg';
import { ReactComponent as GithubIcon } from '../svg/github.svg';
import { ReactComponent as LinkedinIcon } from '../svg/linkedin.svg';
import { ReactComponent as LinkIcon } from '../svg/link-45deg.svg';
import { ReactComponent as XIcon } from '../svg/x.svg';

type AsideMainProps = {
  className?: string, 
  open?: boolean, 
  onToggleOpen?: Function | undefined
}

export default function AsideMain({
  className, 
  open, 
  onToggleOpen
}: AsideMainProps){
  const renderIcon = (icon: string) => {
    const attr = { width: 14, height: 14, className: "mr-2" };
    switch(icon){
      case "github":
        return <GithubIcon {...attr} />;
      case "linkedin":
        return <LinkedinIcon {...attr} />;
      default:
        return <LinkIcon {...attr} />;
    }
  }

  return (
    <>
      <aside 
        id="asideMain" 
        className={className} 
        tabIndex={-1} 
        aria-hidden={!open} 
      >
        <div 
          className={"card shadow-1 pos-sticky t-75px" + (open ? " open" : "")}
        >
          <div className="card-head d-flex a-items-center">
            <InfoIcon width="16" height="16" className="mr-2" />
            Info
            {/* @ts-ignore */}
            <Btn 
              /* @ts-ignore */
              kind="gray" 
              className="py-1 ml-auto d-none btnCloseAsideMain" 
              onClick={onToggleOpen} 
            >
              <XIcon width="16" height="16" />
            </Btn>
          </div>
          <div className="list small">
            <div className="list-item">Created by {AUTHOR}</div>
            {EXTERNAL_LINKS.map((v, i) => // eslint-disable-next-line
              <a 
                key={i} 
                href={v.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="list-item list-action"
              >
                {renderIcon(v.i)}
                {v.label}
              </a>
            )}
          </div>

          <div className="card-foot">
            API from <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer" className="text-noline">{"{JSON}"} Placeholder</a>
          </div>
        </div>
      </aside>

      {open && 
        <div 
          className="backdrop" 
          /* @ts-ignore */
          onClick={onToggleOpen} 
        />
      }
    </>
  );
}