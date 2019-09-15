import React from 'react';

const Pagination = (props) => {
    const {totalMovies, maxPerPage, handleShowMovies} = props;

    let pages = Math.ceil(totalMovies/maxPerPage);
    let pagesArr = [];
    for (let i = 0; i < pages; i++) {
        pagesArr.push(i+1);    
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {
                    pagesArr.map((li)=>(
                    <li key={li} 
                        className="page-item"
                        onClick={()=>{handleShowMovies(li)}}> 
                        {/*eslint-disable-next-line */}
                            <a className="page-link" >{li}</a>
                    </li>))
                }
            </ul>
        </nav>
        )
}
 
export default Pagination;
