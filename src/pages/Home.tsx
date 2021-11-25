import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Ava from '../components/Ava';
import Btn from '../components/Btn';
import ListCol from '../parts/ListCol';
import SearchForm from '../parts/SearchForm';
import request from '../utils/request';
import debounce from '../utils/debounce';
import { API } from '../endpoints';

export default function Home(){
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [searchResult, setSearchResult] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    /* @ts-ignore */
    request(
      API + "/users", 
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

    return () => {
      controller.abort();
    }
  }, []);

  // eslint-disable-next-line
	const debouncedSearch = useCallback(
		debounce((val: string) => {
      const searchKey = (data: any) => searchBy === "address" ? data?.address?.street + " " + data?.address?.suite + " " + data?.address?.city + " " + data?.address?.zipcode : searchBy === "company" ? data?.company?.name : data[searchBy];
      /* @ts-ignore */
      let result = data.filter(item => searchKey(item).toLowerCase().includes(val.toLowerCase()));// f?.[searchBy]
      setSearchResult(result);
      setSearchNotFound(result.length > 0 ? null : "Not Found");
    }, 300), // 1000
		[data, searchBy]  
	);

	const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
		setSearchValue(val);
    debouncedSearch(val.trim());
	}

  const onClearSearch = () => {
    setSearchValue("");
    setSearchResult([]);
    setSearchNotFound(null);
    /* @ts-ignore */
    searchRef?.current.focus();
  }

  return (
    <>
      <SearchForm /* @ts-ignore */
        searchRef={searchRef} 
        disabled={!load} 
        searchValue={searchValue} 
        searchBy={searchBy} 
        onChangeSearch={onChangeSearch} 
        onChangeSearchBy={(e: React.ChangeEvent<HTMLInputElement>) => setSearchBy(e.target.value)} 
        onClearSearch={onClearSearch} 
      />

      {error ? 
        <div className="alert alert-error mt-4 mb-3" role="alert">{error}</div>
        : 
        searchNotFound ? 
        <div className="alert alert-error mt-4 mb-3" role="alert">⚠ Not Found</div>
        : 
        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4 mt-4 mb-3">
          {data.length > 0 ? 
            (searchResult.length > 0 ? searchResult : data).map((item: any, i: number) => 
              <article key={item.id || i} className="col pt-3 mb-2">
                <div className="card h-100 shadow-1 card-user">
                  <header className="d-flex a-items-center user-ava">
                    <Ava 
                      WrapAs={Link} 
                      wrapProps={{
                        to: "/user/" + item.id, 
                        title: item.username, 
                      }}
                      wrapClass="shadow-1 flexno a-self-baseline" 
                      className="of-cov" 
                      w={50} 
                      h={50} 
                      thumb 
                      circle 
                      alt={item.name} 
                      src={`https://randomuser.me/api/portraits/men/${item.id}.jpg`}
                    />
                    <Link to={"/user/" + item.id} className="mxw-100 shadow-1 border link-dark text-noline text-ellipsis username" title={item.username}>{item.username}</Link>
                  </header>
                  <section className="card-body">
                    <h1 className="h6">
                      <Link to={"/user/" + item.id} className="link-dark text-noline">{item.name}</Link>
                    </h1>

                    <ListCol 
                      label="Email" 
                      value={<a href={"mailto:" + item.email} className="text-noline link-dark d-inline-block mxw-100 text-ellipsis qi i-mail" title={item.email}> {item.email}</a>} 
                    />

                    <ListCol 
                      label="Phone" 
                      value={<a href={"tel:+" + item.phone} className="text-noline link-dark d-inline-block qi i-phone" rel="nofollow"> {item.phone}</a>} 
                    />
                  </section>
                  <footer className="card-foot text-end">
                    {/* @ts-ignore */}
                    <Btn As={Link} to={"/user/" + item.id}>Detail</Btn>
                  </footer>
                </div>
              </article>
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
                    <div className="text-end">
                      <div className="btn disabled placeholder col-md-3" />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      }
    </>
  );
}
