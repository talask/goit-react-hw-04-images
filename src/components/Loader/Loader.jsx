import { Dna } from 'react-loader-spinner';
import { LoaderDiv } from "./Loader.styled";

export const Loader = () => {
    return (
        <LoaderDiv>
            <Dna
                height="180"
                width="180" 
            />
        </LoaderDiv>
    )
}