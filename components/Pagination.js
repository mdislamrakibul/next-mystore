import React from 'react'

function Pagination({ nPages, currentPage, setCurrentPage }) {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <>
            <div>
                <ul className='pagination justify-content-center'>
                    <li className="page-item">
                        <a className="page-link"
                            onClick={prevPage}
                            href='#'>
                            <i className="fas fa-backward"></i> Prev
                        </a>
                    </li>
                    {pageNumbers.map(pgNumber => (
                        <li key={pgNumber}
                            className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                            <a onClick={() => setCurrentPage(pgNumber)}
                                className='page-link'
                                href='#'>

                                {pgNumber}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link"
                            onClick={nextPage}
                            href='#'>
                            Next <i className="fas fa-forward"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Pagination