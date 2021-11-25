import { forwardRef, SyntheticEvent } from 'react';

import darkOrLight from '../utils/darkOrLight';
import getInitials from '../utils/getInitials';
import str2Hex from '../utils/str2Hex';
import { setClass, hasClass, setAttr, Cx } from '../utils/dom';

export interface AvaProps {
  className?: string | undefined, 
	src?: string, 
	alt?: string, 
	w?: number | string | any, 
	h?: number | string | any, 
	loading?: "lazy" | "eager" | undefined, // string | undefined
	drag?: boolean | undefined, 
	WrapAs?: string | any, 
	wrapClass?: string | undefined, 
	wrapProps?: object, 
	bg?: string | undefined, 
	circle?: boolean | undefined, 
	round?: boolean | undefined, 
	thumb?: boolean | undefined, 
	onError?: Function | undefined, 
	onLoad?: Function | undefined, 
}

const Ava = forwardRef<HTMLImageElement, AvaProps>(
	({
		w = 30, 
		h = 30, 
		src, 
		alt = " ", 
		loading = "lazy", 
		drag = false, 
		className, 
		WrapAs = "div", 
		wrapClass = "", 
		wrapProps, 
		bg, // DEFINE background-color
		circle, 
		round, 
		thumb, 
		onError, 
		onLoad, 
		...etc
	}, 
	ref
) => {
	const Load = (e: SyntheticEvent) => {
		setClass(e.target, 'ava-loader', 'remove');
		if(onLoad) onLoad(e);
	}
	
	const Err = (e: SyntheticEvent) => {
		let et = e.target;

		setClass(et, 'ava-loader', 'remove');
		
		if(hasClass(et, "text-dark")) setClass(et, "text-dark", "remove");
		if(hasClass(et, "text-light")) setClass(et, "text-light", "remove");

		let fs = '--fs:calc(';
		if(isNaN(w)){
			let num = parseFloat(w);
			let unit = w.replace("" + num, "");
			fs += num + unit + " / 2.25);";
		}else{
			fs += w + "px / 2.25);";
		}
		
		let trm = alt.trim();
		let color = bg ? bg.replace("#", "") : str2Hex(trm);
		
		setAttr(et, {
			'aria-label': getInitials(trm), 
			style: fs + "--bg:#" + color 
		});
		
		setClass(et, darkOrLight(color) === "dark" ? "text-light":"text-dark");
		
		if(onError) onError(e);
		
		return;
	}

	const Wrap = WrapAs as React.ElementType;

	return (
		<Wrap 
			{...wrapProps} 
			className={
				Cx("img-frame ava-frame", {
					'img-thumb': thumb, 
					'circle': circle, 
				}, wrapClass)
			}
		>
			<img 
				{...etc} 
				ref={ref} 
				loading={loading} 
				width={w} 
				height={h} 
				alt={alt} 
				src={src} 
				className={
					Cx("ava ava-loader", {
						'rounded': round, 
						'circle': circle, 
					}, className)
				}
				draggable={drag} 
				onError={Err}
				onLoad={Load} 
			/>
		</Wrap>
	);
});

export default Ava;




