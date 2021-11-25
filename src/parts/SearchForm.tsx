import { ReactComponent as XIcon } from '../svg/x.svg';
import Input from '../components/Input';
import Btn from '../components/Btn';

type SearchFormProps = {
  searchValue?: string, 
  searchBy?: string, 
  disabled?: boolean, 
  searchRef?: any, 
  onChangeSearch?: Function | undefined, 
  onClearSearch?: Function | undefined, 
  onChangeSearchBy?: Function | undefined, 
  children?: any
}

export default function SearchForm({
  searchValue, //  = ""
  searchBy, 
  disabled = false, 
  searchRef, 
  onChangeSearch, 
  onClearSearch, 
  onChangeSearchBy, 
  children
}: SearchFormProps){
  const filterOptions = ["name", "email", "username", "phone", "address", "company"];

  return (
    <div className="input-group has-validation shadow-1 mb-2">
      <Input 
        ref={searchRef} /* @ts-ignore */
        placeholder="Search" 
        disabled={disabled} 
        value={searchValue} 
        onChange={onChangeSearch} 
      />
      {/* @ts-ignore */}
      {searchValue.length > 0 && /* @ts-ignore */
        <Btn 
          As="div" 
          kind="gray"  
          onClick={onClearSearch} 
        >
          <XIcon width="16" height="16" />
        </Btn>
      }
      <label htmlFor="searchBy" className="input-group-text round-0">
        By
      </label>
      <select 
        id="searchBy" 
        className="form-select flexno w-auto text-cap" 
        disabled={disabled} 
        value={searchBy} /* @ts-ignore */
        onChange={onChangeSearchBy} 
      >
        {filterOptions.map(item => 
          <option key={item} value={item}>{item}</option>
        )}
      </select>

      {children}
    </div>
  )
}