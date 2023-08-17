import PropTypes from 'prop-types'

const Card = ({title, content, children, onClick})=>{
    return (
        <div className="card mb-3 cursor-pointer" onClick={onClick}>
            <div className="card-body">
                {/* <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p> */}
                <div className="d-flex justify-content-between">
                    <div>{title}</div>
                    <div>{content}</div>
                    {children && <div> {children}</div>}
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    onClick: PropTypes.func
}

Card.defaultProps = {
    title: 'Title',
    children: null,
    onClick: () => {},
}

export default Card;