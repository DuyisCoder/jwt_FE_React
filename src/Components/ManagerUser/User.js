import React, { useEffect, useState } from 'react'
import './User.scss'
import { deleteUser, fetchUserData, updateUser } from '../../services/userServices'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify'
import ModelDelete from '../ModelFrom/ModelDelete'
import ModelUser from '../ModelFrom/ModelUser'
import { set } from 'lodash';
export default function User() {
    const [listUser, setListUser] = useState([]);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(6)
    const [totalPages, setTotalPages] = useState(0)
    // dataModal delete
    const [dataModal, setDataModel] = useState({});
    const [showModalDelete, setShowModalDelete] = useState(false);
    // dataModal edit/create
    const [showModalUser, setShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalEdit, setDataModelEdit] = useState({});
    useEffect(() => {
        fetch();

    }, [page])
    const fetch = async () => {
        let res = await fetchUserData(page, limit);
        if (res && res.EC === 0) {
            setTotalPages(res.DT.totalPages)
            setListUser(res.DT.users);
        }
    }
    const handlePageClick = async (event) => {
        setPage(+event.selected + 1);
        // await fetch();
    };
    const handleDelete = async (user) => {
        setDataModel(user);
        setShowModalDelete(true);
    }
    const handleClose = () => {
        setShowModalDelete(false);
        setDataModel({});
    }
    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataModal);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setTimeout(async () => {
                await fetch();
                setShowModalDelete(false);
            }, [500])
        } else {
            toast.error(res.EM);
        }
    }
    const handleCreateUser = () => {
        setShowModalUser(true);
        setActionModalUser("CREATE");// Click vào Edit sẽ phải set lại nếu ko sẽ bị bug
    }
    const handleHiddenModal = () => {
        setShowModalUser(false);
        setDataModelEdit({});
        fetch();//khi đóng modal cần pải fetch API lại để hiện user khi create ma kh can load lai trang
    }
    const handleEdit = (user) => {
        setActionModalUser("UPDATE");
        setDataModelEdit(user);
        setShowModalUser(true);
    }
    return (
        <>
            <div className='container'>
                <div className='manage-users-container'>
                    <div className='user-header'>
                        <div className='title mt-3'>
                            <h3>Manager Users:</h3>
                        </div>
                        <div className='actions my-3'>
                            <button className='btn btn-success refresh'>
                                <i className='fa fa-refresh '></i>
                                Refresh
                            </button>
                            <button onClick={() => handleCreateUser()} className='btn btn-primary'>
                                <i className='fa fa-plus-circle'></i>
                                Create User
                            </button>
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
                                                    <td>{(page - 1) * limit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : 'Chưa có'}</td>
                                                    <td className='d-flex justify-content-around'>
                                                        <span
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            <i className='fa fa-pencil font-i edit'></i>
                                                        </span>
                                                        <span
                                                            onClick={() => handleDelete(item)}
                                                        >
                                                            <i className='fa fa-trash-o font-i delete'></i>
                                                        </span>
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
            </div >
            <ModelDelete
                show={showModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModelUser
                onHide={handleHiddenModal}
                show={showModalUser}
                action={actionModalUser}
                dataModalEdit={dataModalEdit} />
        </>

    )
}
