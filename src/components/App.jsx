import React, { useState, useEffect } from "react";
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
  const [page, setPage] = useState('');
  const [error, setError] = useState('');
  const [modalImage, setModalImage] = useState({url: '', tag: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isModal, setIsModal] = useState(false);
  

  useEffect(() => {
    setData([]);
    loadPixabay(value, page);
    
  },[value, page]);

  function handleSubmit(value, page) {
    setValue(value);
    setPage(page);
  }

   

  async function loadPixabay(value, page)  {
    setIsLoading(true);
    try {
      const { totalHits, hits } = await getPixabayAPI(value, page);
         
          setData([...data, ...hits]);
          setIsLoadMore(options.page < Math.ceil(totalHits/options.per_page));
      
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
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
