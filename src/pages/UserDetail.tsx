import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Ava from '../components/Ava';
import Btn from '../components/Btn';
import ListCol from '../parts/ListCol';
import request from '../utils/request';
import { ReactComponent as GeoIcon } from '../svg/geo.svg';
import { API } from '../endpoints';

type UrlParams = {
  id?: string | undefined
}

type DataKeys = {
  id?: string | undefined, 
  name?: string | undefined, 
  username?: string | undefined, 
  email?: string | undefined, 
  phone?: string | undefined, 
  website?: string | undefined, 
  company?: object | undefined | any, 
  address?: object | undefined | any, 
}

export default function UserDetail(){
  const listProps = { labelSize: 2, valueSize: 10 };
  const { id } = useParams<UrlParams>();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);// 
  const [data, setData] = useState<DataKeys>({});

  useEffect(() => {
    const controller = new AbortController();

    if(id){
      /* @ts-ignore */
      request(
        API + "/users/" + id, 
        { signal: controller.signal }
      )
      .then(res => {
        // console.log('res: ', res);
        setData(res);
      })
      .catch(e => {
        (e.code !== 20 || e.name !== "AbortError") && setError("Failed load users");
      })
      .finally(() => setLoad(true));
    }

    return () => {
      id && controller.abort();
    }
  }, [id]);

  if(error){
    return <div className="alert alert-error" role="alert">{error}</div>;
  }

  return (
    <div className="card shadow-1 card-user">
      {load ? 
        <div className="card-body">
          <figure className="d-flex a-items-center">
            <Ava 
              w={120} 
              h={120} 
              wrapClass="shadow-1" 
              thumb 
              circle 
              className="of-cov" 
              alt={data.name} 
              src={`https://randomuser.me/api/portraits/men/${data.id}.jpg`}
            />

            <figcaption className="h3 mb-0 shadow-1 border username">{data.username}</figcaption>
          </figure>

          <h1 className="h4">
            {data.name}
          </h1>

          <ListCol 
            {...listProps} 
            label="Email" 
            value={<a href={"mailto:" + data.email} className="text-noline link-dark qi i-mail" title={data.email}> {data.email}</a>} 
          />

          <ListCol 
            {...listProps} 
            label="Phone" 
            value={<a href={"tel:+" + data.phone} className="text-noline link-dark d-inline-block qi i-phone" rel="nofollow"> {data.phone}</a>} 
          />

          <ListCol 
            {...listProps} 
            label="Website" 
            value={<a href={"http://" + data.website} className="text-noline link-dark d-inline-block bi bi-link-45deg i-mr" target="_blank" rel="noopener noreferrer">{data.website}</a>} 
          />
          <ListCol 
            {...listProps} 
            label="Company" 
            value={data?.company?.name} 
          />
          <hr />
          <address>
            Address
            <p>{data?.address?.street + ", " + data?.address?.suite + ", " + data?.address?.city + ", " + data?.address?.zipcode}</p>
            {/* @ts-ignore */}
            <Btn 
              href={`https://maps.google.com/?q=${data?.address?.geo?.lat},${data?.address?.geo?.lng}`} 
              target="_blank" 
              rel="noopener noreferrer" 
            >
              <GeoIcon width="16" height="16" /> Geo
            </Btn>
          </address>
        </div>
        :
        <div className="card-body">
          <div className="placeholder-glow mb-3">
            <div className="placeholder circle img-thumb" style={{ width: 120, height: 120 }} />
          </div>
          <div className="h4 mt-2 placeholder-glow">
            <div className="placeholder col-md-3" />
          </div>
          <p className="d-flex flex-col mt-2-next placeholder-glow">
            {[1, 2, 3].map((v) => 
              <span key={v} className="placeholder col-md-9" />
            )}
          </p>
          <hr />
          <p className="d-flex flex-col mt-2-next placeholder-glow">
            {[2, 9].map((v) => 
              <span key={v} className={"placeholder col-md-" + v} />
            )}
          </p>
        </div>
      }
    </div>
  );
}