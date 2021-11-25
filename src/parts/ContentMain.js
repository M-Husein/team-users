import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';// Link

import Ava from '../components/Ava';
import Btn from '../components/Btn';
import ListCol from './ListCol';
import request from '../utils/request';
// import { Cx } from '../utils/dom';

// export interface ContentMainProps {
//   className?: string;
// }

export default function ContentMain(){ // 
  const history = useHistory();
  // const { className } = props;
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then(res => res.ok && res.json())
    // .then(data => console.log('data: ', data))
    // .catch(e => console.log('e: ', e))
    // .finally()
    
    request('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      console.log('res: ', res);
      setData(res);
    })
    .catch(e => {
      console.log('e: ', e);
      setError("Failed load users");
    })
    .finally(() => setLoad(true));
  }, []);

  const onDetail = (id) => history.push("/user/" + id);

  return (
    <>
      {error ? 
        <div className="alert alert-error" role="alert">{error}</div>
        : 
        <>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {data.length > 0 ? 
              data.map((item, i) => 
                <div key={item.id || i} className="col pt-3">
                  <div className="card h-100 shadow-1 card-user">
                    {/* <div className="card-head">Head</div> */}
                    <div className="d-flex a-items-center user-ava">
                      <Ava 
                        wrapProps={{
                          title: item.username, 
                          onClick: () => onDetail(item.id)
                        }}
                        wrapClass="shadow-1 flexno a-self-baseline cpoin" 
                        className="of-cov" 
                        w={50} 
                        h={50} 
                        thumb 
                        circle 
                        alt={item.name} 
                        src={`https://randomuser.me/api/portraits/men/${item.id}.jpg`}
                      />
                      <div className="mxw-100 shadow-1 border text-ellipsis cpoin username" title={item.username}>{item.username}</div>
                    </div>
                    <div className="card-body">
                      {/* <ListCol  
                        className="mb-1" 
                        label="Name" 
                        value={item.name} 
                      /> */}

                      <h6>{item.name}</h6>

                      <ListCol 
                        label="Email" 
                        value={<a href={"mailto:" + item.email} className="text-noline link-dark d-inline-block mxw-100 text-ellipsis bi bi-envelope i-dark i-mr" title={item.email}>{item.email}</a>} 
                      />

                      <ListCol 
                        label="Phone" 
                        value={<a href={"tel:+" + item.phone} className="text-noline link-dark d-inline-block bi bi-telephone i-mr" rel="nofollow">{item.phone}</a>} 
                      />
                      
                      
                    </div>
                    <div className="card-foot">
                      <Btn outline>Detail</Btn>
                    </div>
                  </div>
                </div>
              )
              : 
              load && <div className="alert alert-info" role="alert">No users data</div>
            }

            {!load && 
              [1, 2, 3].map((v) => 
                <div key={v} className="col pt-3">
                  <div className="card shadow-1 card-user" aria-hidden>
                    <div className="d-flex a-items-center user-ava">
                      <div className="placeholder-glow">
                        <span className="placeholder w-50px h-50px circle img-thumb" />
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="d-flex flex-col mt-2-next placeholder-glow">
                        {[1, 2, 3].map((v) => 
                          <span key={v} className="placeholder col-md-9" />
                        )}
                      </p>
                      <div className="btn btn-primary disabled placeholder col-md-3" />
                    </div>
                  </div>
                </div>
              )
            }

            
          </div>
        </>
      }
    </>
  );
}
