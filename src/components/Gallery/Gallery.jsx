import { GalleryItem } from "components/GalleryItem/GalleryItem";
import { ImageGallery } from "./Gallery.styled";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const Gallery = ({images, onLoadModal}) => {
    return (
       
        <ImageGallery>
            {images.map((itemImage) => {
                return <GalleryItem  key={nanoid()} image={itemImage} onLoadModal={onLoadModal}/>
            })}

            </ImageGallery>
    );
}

Gallery.propTypes = {
    onLoadModal: PropTypes.func,
    images: PropTypes.array,
};