import { Route } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";

export default function RouteLazy(props: any){
  return (
    /* @ts-ignore */
    <ErrorComponent>
      <Route {...props} />
    </ErrorComponent>
  );
}
