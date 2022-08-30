import Cookies from 'js-cookie';
import moment from 'moment';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import baseUrl from '../helpers/baseUrl';
import { errorMsg, successMsg } from '../helpers/Toastify';
import Loading from './Loading';
import Pagination from './Pagination';
// import Pagination from '@material-ui/lab/Pagination';
function UserRoles() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { token, user } = parseCookies()
    const [page, setPage] = useState(1);
    const authUser = Cookies.get('user') && JSON.parse(Cookies.get('user'))

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    useEffect(() => {
        fetchUser()
    }, [])
    const fetchUser = async () => {
        setIsLoading(true)
        const res = await fetch(`${baseUrl}/api/users`, {
            headers: {
                "Authorization": token
            }
        })
        const resp = await res.json()
        if (resp.status) {
            setIsLoading(false)
            successMsg(resp.message)
        } else {
            setIsLoading(false)
            errorMsg(resp.message)
        }
        setUsers(resp?.data?.length ? resp.data : [])
    }
    const handleRole = async (_id, role) => {
        setIsLoading(true)
        const res = await fetch(`${baseUrl}/api/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                _id,
                role
            })
        })
        const res2 = await res.json()
        if (!res2.status) {
            setIsLoading(false)
            errorMsg(res2.message)
        } else {
            setIsLoading(false)
            const updatedUsers = users.map(user => {
                if ((user.role != res2.data.role) && (user.email == res2.data.email)) {
                    return res2.data
                } else {
                    return user
                }
            })
            setUsers(updatedUsers)
        }
        // console.log(res2.data);
        // setUsers(res2)
    }
    const handleActivity = async (_id, isActive) => {
        setIsLoading(true)
        const res = await fetch(`${baseUrl}/api/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                "isActive": isActive
            },
            body: JSON.stringify({
                _id,
                isActive
            })
        })
        const res2 = await res.json()
        if (!res2.status) {
            setIsLoading(false)
            errorMsg(res2.message)
        } else {
            setIsLoading(false)
            successMsg(res2.message)
        }
        const updatedUsers = users.map(user => {
            if (user.email == res2.data.email) {
                return res2.data
            } else {
                return user
            }
        })
        setUsers(updatedUsers)
    }
    const handlePageChange = (event, value) => {
        console.log(event, value);
        console.log(users);
        setPage(value);
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(users.length / recordsPerPage)


    return (
        <>
            {isLoading && <Loading />}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>
                    <h5>User & roles </h5><h6 style={{ color: 'red' }}></h6>
                </span>
                <span >
                    <a className="btn btn-sm btn-warning" onClick={() => fetchUser()} style={{ display: 'flex', alignItems: 'center' }}>
                        Reload&nbsp;<i className="fas fa-sync"></i>
                    </a>
                </span>
            </div>
            <hr />
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Sl.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created</th>
                        {authUser?.role === 'root' &&
                            <th>Role [Type]</th>
                        }
                        {authUser?.role === 'root' &&
                            <th>Actions <br />(Role | Active/deactivate)</th>
                        }

                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>
                                    {index + 1}.
                                </td>
                                <td>
                                    <img src={item.image} alt={item.username} width={'50px'} height={'auto'} />
                                </td>
                                <td>{item.username}</td>
                                <td>{authUser.role === 'root' ? item.email : '**********************'}</td>
                                <td> {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss')}</td>
                                {authUser?.role === 'root' &&
                                    <td>
                                        {item.role === 'root' && <span className="badge text-bg-primary" style={{ color: 'white' }}><b>{item.role} [{item.isActive ? 'A' : 'D'}]</b></span>}
                                        {item.role === 'admin' && <span className="badge text-bg-success" style={{ color: 'white' }}><b>{item.role} [{item.isActive ? 'A' : 'D'}]</b></span>}
                                        {item.role === 'user' && <span className="badge  text-bg-secondary" style={{ color: 'white' }}><b>{item.role} [{item.isActive ? 'A' : 'D'}]</b></span>}
                                    </td>
                                }
                                {authUser?.role === 'root' &&
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-info btn-sm" onClick={() => handleRole(item._id, item.role)}
                                            >
                                                <i className="fas fa-universal-access"></i>
                                            </button>
                                            {item?.isActive &&
                                                <button className='btn btn-sm btn-danger' onClick={() => handleActivity(item._id, item.isActive)}>
                                                    <i className="far fa-times-circle"></i>
                                                </button>
                                            }
                                            {!item?.isActive &&
                                                <button className='btn btn-sm btn-success' onClick={() => handleActivity(item._id, item.isActive)}>
                                                    <i className="far fa-check-circle"></i>
                                                </button>
                                            }
                                        </div>
                                    </td>
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* <div>
                {page}
                <Pagination count={users.length / 1} page={page} onChange={handlePageChange} />
            </div> */}
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}
export default UserRoles