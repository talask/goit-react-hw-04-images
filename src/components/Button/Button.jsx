import { ButtonLoadMore } from "./Button.styled";
import PropTypes from 'prop-types';

export const Button = ({onLoadMore}) => {
    return (
        <ButtonLoadMore onClick={onLoadMore}>Load more</ButtonLoadMore>
    )
}

Button.propTypes = {
    onLoadMore: PropTypes.func,
};