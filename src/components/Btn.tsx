import { forwardRef, SyntheticEvent } from 'react';
import { Cx } from '../utils/dom';

type BtnProps = {
	As?: string | any, 
	kind?: string, 
  className?: string | undefined, 
	href?: string | undefined,
  type?: string,
  disabled?: boolean | undefined, 
	active?: boolean | undefined, 
	role?: string | undefined, 
	tabIndex?: string | number | undefined, 
	onClick?: Function | undefined, 
	// children?: string | any, 
	target?: string | undefined, 
	rel?: string | undefined, 
};

const Btn = forwardRef<HTMLButtonElement, BtnProps>(
	({
		As = "button", 
		kind = "primary", 
		active, 
		className, 
		type, 
		disabled, 
		role, 
		href, 
		tabIndex, 
		onClick, 
		target, 
		rel, 
		...etc
	}, 
	ref
) => {
	const Click = (e: SyntheticEvent) => {
		if(disabled || (As === 'a' && href === '#')){
			e.preventDefault();
			return;
		}
		
		if(onClick) onClick(e);
	}
	
	const El = (As === 'button' && href ? As = 'a' : As) as React.ElementType;

	return (
		<El /* @ts-ignore */
			{...etc} 
			ref={ref} 
			className={
				Cx(
					`btn btn-${kind}`, 
					{ active, disabled: disabled }, 
					className
				) 
			} 
			type={As !== "button" && !type ? undefined : type ? type : "button"} 
			role={As !== "button" && !role ? "button" : role} 
			tabIndex={As !== "button" && disabled && !tabIndex ? -1 : tabIndex} 
			disabled={As === "button" && disabled} 
			aria-disabled={disabled || null} 
			onClick={Click} 
			href={href} 
			target={target} 
			rel={rel}
		/>
	);
});

export default Btn;	


