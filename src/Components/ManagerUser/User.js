import React, { useEffect, useState } from 'react'
import './User.scss'
import { fetchUserData } from '../services/userServices'
import ReactPaginate from 'react-paginate';
export default function User() {
    const [listUser, setListUser] = useState([]);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)
    const [totalPages, setTotalPages] = useState(0)
    useEffect(() => {
        fetch();

    }, [page])
    const fetch = async () => {
        let res = await fetchUserData(page, limit);
        if (res && res.data && res.data.EC === 0) {
            setTotalPages(res.data.DT.totalPages)
            setListUser(res.data.DT.users);
        }
    }
    const handlePageClick = async (event) => {
        setPage(+event.selected + 1);
        // await fetch();
    };

    return (
        <div className='container'>
            <div className='manage-users-container'>
                <div className='user-header'>
                    <div className='title'>
                        <h3>Table User:</h3>
                    </div>
                    <div className='actions'>
                        <button className='btn btn-success'>Refresh</button>
                        <button className='btn btn-primary'>Create User</button>
                    </div>
                </div>
                <div className='user-body mt-3'>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 ?
                                <>
                                    {listUser.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index++}</td>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : 'Chưa có'}</td>
                                                <td className='d-flex justify-content-around'>
                                                    <button className='btn btn-warning'>Edit</button>
                                                    <button className='btn btn-danger '>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </> :
                                <>
                                    <tr>
                                        <td>

                                        </td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>

                </div>
                {totalPages > 0 &&
                    <div className='user-footer d-flex justify-content-center align-items-center'>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
