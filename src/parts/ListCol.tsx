// export interface ListColProps {
//   label?: string, 
//   value?: any
// }

type ListColProps = {
  label?: string,
  value?: any,
  labelSize?: number, 
  valueSize?: number
};

export default function ListCol({
  label, 
  value, 
  labelSize = 3, 
  valueSize = 9
}: ListColProps){
  return (
    <div className="row">
      <div className={"col-md-" + labelSize}>
        {label}
      </div>
      <div className={"col-md-" + valueSize}>
        {value}
      </div>
    </div>
  )
}