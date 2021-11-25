import { isObj, isStr, isNum } from './typeChecking';

export function setClass(el, c, fn = "add"){
  let cls = c.split(" ");
  el.classList[fn](...cls);
}

export function hasClass(el, c){
  return el.classList.contains(c);
}

export /**
@el 	: DOM element / node
@attr : valid attribute name & value (Object)
*/
function setAttr(el, attr){
  if(el){
    if(isObj(attr)){
      for(let key in attr){
        el.setAttribute(key, attr[key]);
      }
    }
    else if(isStr(attr)) attr.split(" ").forEach(v => el.removeAttribute(v));
    else console.warn('setAttr() : params 2 required Object to add / string to remove, To remove several attributes, separate the attribute names with a space.');
  }
}

export function Cx(){
  let hasOwn = {}.hasOwnProperty,
      c = [],
      alength = arguments.length;
  for(let i = 0; i < alength; i++){
    let arg = arguments[i];
    if(!arg) continue;

    if(isStr(arg) || isNum(arg)){
      c.push(arg);
    }else if(Array.isArray(arg) && arg.length){
      let inr = Cx.apply(null, arg);
      if(inr) c.push(inr);
    }else if(isObj(arg)){
      for(let k in arg){
        if(hasOwn.call(arg, k) && arg[k]) c.push(k);
      }
    }
  }
  return c.length > 0 ? c.join(" ") : undefined;
}

