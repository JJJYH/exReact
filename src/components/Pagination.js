import propsType from "prop-types";  


const Pagenation = ({currentPage, numberOfPages, onClick, limit}) => {
    const currentSet = Math.ceil(currentPage/limit);
    const startPage = limit* (currentSet-1)+1;
    const lastSet = Math.ceil(numberOfPages/limit);
    const numberOfPageForSet = (currentSet === lastSet ?(numberOfPages % limit || limit) : limit);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {startPage>1 &&
                <li className="page-item ">
                    <div className="page-link cursor-pointer" onClick={()=>onClick(startPage-limit)}>Previous</div>
                </li>
                }
                {Array(numberOfPageForSet).fill(startPage).map((value, index)=> value+index)
                    .map((pageNumber)=>{
                        return <li key={pageNumber} className={`page-item ${currentPage===pageNumber ? 'active':''}`}>
                                    <div className="page-link cursor-pointer" onClick={()=>onClick(pageNumber)}>
                                        {pageNumber}
                                    </div>
                                </li>
                    })
                }
                {currentSet!==lastSet &&
                <li className="page-item">
                    <div className="page-link" onClick={()=>onClick(startPage+limit)}>Next</div>
                </li>
                }
            </ul>
        </nav>
  );
}

Pagenation.propsType = {
    currentPage: propsType.number,
    numberOfPages: propsType.number.isRequired,
    onClick: propsType.func.isRequired,
    limit : propsType.number
}
Pagenation.defaultProps = {
    currentPage: 1,
    limit:5
}

export default Pagenation;