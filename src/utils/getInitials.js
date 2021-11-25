import { isStr } from './typeChecking';

export default function getInitials(name, no = "?"){
	if(!name || !isStr(name) || name === " " || name.length < 1) return no;
	// Destruct 
  let [first, last] = name.split(" ");

  if(first && last){
    return first[0] + last[0];
  }
	return first[0];
}
