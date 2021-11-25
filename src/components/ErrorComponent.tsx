import { ErrorBoundary } from './error-boundary';
import Btn from './Btn';
import { Cx } from '../utils/dom';

type ErrorComponentProps = {
  prefixClass?: string | undefined, 
  type?: string | undefined, 
  className?: string | undefined, 
}

export default function ErrorComponent({
  prefixClass = "alert", 
  type = "error", 
  className, 
  ...etc 
}: ErrorComponentProps){
  return (
    <ErrorBoundary 
      fallbackRender={() => (
        <div 
          role="alert" 
          className={
            Cx(
              "d-flex flex-col jc-center a-items-center",  
              prefixClass, 
              "text-break ovauto w-100", {
              ["alert-" + type]: type
            }, className)
          } 
        >
          <h3 className="text-dark">⚠ Something went wrong.</h3>

          {navigator.onLine ? /* @ts-ignore */
            <Btn onClick={() => window.location.reload()} variant="outline-primary">Reload</Btn>
            : 
            <p className="lead mb-0">Your internet connection is offline.</p>
          }
        </div>
      )} 
      onError={(err, info) => {
        console.log('onError Component error: ', err);
        console.log('onError Component info: ', info);
        // Send error info to server here
      }} 
      {...etc}
    />
  )
}