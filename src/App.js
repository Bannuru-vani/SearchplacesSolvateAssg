import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import { api } from "./API/axios";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState();

  // geo/cities
  useEffect(() => {
    if (searchText) {
      getPlacesData(searchText, currentPage, pageSize);
    }
  }, [currentPage, pageSize]);

  const onEnterPress = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    if (searchText === "") {
      setPlaces([]);
    } else {
      getPlacesData(searchText, 1, pageSize);
    }
  };

  const getPlacesData = async (searchText, currentPage, pageSize) => {
    try {
      setLoading(true);
      let offset = (currentPage - 1) * pageSize;
      let URL = `/geo/cities/?namePrefix=${searchText}&limit=${pageSize}&offset=${offset}`;
      const res = await api.get(URL);
      let data = res.data.data;
      setPlaces(data);
      setTotalCount(res.data.metadata.totalCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  return (
    <div className="app">
      <SearchBox
        setSearchText={setSearchText}
        searchText={searchText}
        onEnterPress={onEnterPress}
      />
      <Table
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        places={places}
        totalCount={totalCount}
        searchText={searchText}
        loading={loading}
      />
    </div>
  );
}

export default App;
