import React, { Component } from 'react';
import './Pagination.css'

class Pagination extends Component {
    state = {  } 
    render() { 
        return (
          <nav>
          <ul className="pagination justify-content-center">
              {this.props.currentPage == 1 ? (
              <li className="page-item disabled">
                <a className="page-link" aria-disabled="true">Previous</a>
              </li>
              ) : (
                <li className="page-item" onClick = {this.props.previousPage}>
                  <a className="page-link" >Previous</a>
              </li>
              )}
            )
            {this.props.pages.map( (pageCount) => {
              return pageCount == this.props.currentPage ? (
                <li className="page-item active" key={pageCount}>
                  <a className="page-link" href="#">
                    {pageCount}
                  </a>
                </li>
              ):(
                <li className="page-item" key={pageCount}
                onClick={()=>{ this.props.setPage(pageCount) }}>
                  <a className="page-link" href="#">
                    {pageCount}
                  </a>
                </li>
              )
            
            })}
            {this.props.currentPage == this.props.pages.length ? (
                <li className="page-item disabled">
                <a className="page-link"aria-disabled="true">Next</a>
              </li> 
            ) : (
              <li className="page-item" onClick={this.props.nextPage}>
              <a className="page-link">Next</a>
            </li> 
            )}    
          </ul>
        </nav>
        );
    }
}
 
export default Pagination;