import React, { useState, useEffect, useRef } from "react";
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from "./Gallery/Gallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { getPixabayAPI, options } from './PixabayAPI/PixabayAPI';
import { AppDiv } from "./App.styled";
import { Modal } from "./Modal/Modal";

export const App = () => {
 
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
 // const [error, setError] = useState('');
  const [modalImage, setModalImage] = useState({url: '', tag: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const prevValueRef = useRef(value);
  const prevPageRef = useRef(page);
  

  useEffect(() => {
    if (prevValueRef.current !== value || prevPageRef.current !== page) {
      if(prevValueRef.current !== value) setData([]);
      loadPixabay(value, page);
    }

    prevValueRef.current = value;
    prevPageRef.current = page;

    async function loadPixabay(value, page)  {
      setIsLoading(true);
      try {
        const { totalHits, hits } = await getPixabayAPI(value, page);
           
          if(hits.length > 0) {
            setData([...data, ...hits]);
            setIsLoadMore(options.page < Math.ceil(totalHits/options.per_page));
          }else{
            alert('it\'s empty.... Any images for your query')
          }
      } catch (error) {
      //  setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

  },[value, page, data]);

  function handleSubmit(value, page) {
    setValue(value);
    setPage(page);
  }

  function handleLoadMore() {

    setPage(page + 1);

  }

  const handleModal = (id) => {
    setIsModal(true);
    const searchImage = data.filter((image) => {
     return image.id === id
    });
   
    setModalImage({ url: searchImage[0].largeImageURL, tag: searchImage[0].tags});
  }

  const handleCloseModal = (e) => { setIsModal(false); }
   
 
    return (
     
      <AppDiv>
        <Searchbar onSubmit={handleSubmit}></Searchbar>
        
        { data.length > 0 && <Gallery images={data} onLoadModal={handleModal}/> }
        { isLoading && <Loader /> }
        { isLoadMore && <Button onLoadMore={handleLoadMore}/> }
       
        { isModal && 
          <Modal 
            onClose={handleCloseModal} 
            url={modalImage.url} 
            tag={modalImage.tag}/>}
      </AppDiv>  
      
    );

  
  
};
