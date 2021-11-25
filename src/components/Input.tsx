import { forwardRef } from 'react';
import { Cx } from '../utils/dom';

type InputProps = {
  prefixClass?: string, 
  type?: string, 
  className?: string |  undefined, 
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    prefixClass = "form-ctrl", 
    type = "text", 
    className, 
    ...etc
  }, 
  ref
) => {
  return (
    <input 
      {...etc} 
      ref={ref} 
      className={Cx(prefixClass, className)} 
      type={type} 
    />
  )
});

export default Input;