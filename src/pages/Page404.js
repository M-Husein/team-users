import Btn from '../components/Btn';

export default function Page404(){
  return (
    <div className="d-flex flex-col jc-center a-items-center text-center h-75vh">
      <h1>
        ⚠<br/>
        Not Found
      </h1>
      <Btn outline As="a" href="/">Back to Home</Btn>
    </div>
  );
}