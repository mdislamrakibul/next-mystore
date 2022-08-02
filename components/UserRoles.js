import moment from 'moment'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import baseUrl from '../helpers/baseUrl'
function UserRoles()
{
    const [users, setUsers] = useState([])
    const { token } = parseCookies()
    useEffect(() =>
    {
        fetchUser()
    }, [])
    const fetchUser = async () =>
    {
        const res = await fetch(`${baseUrl}/api/users`, {
            headers: {
                "Authorization": token
            }
        })
        const resp = await res.json()
        if (resp.status) {
        } else {
        }
        setUsers(resp?.data?.length ? resp.data : [])

    }

    const handleRole = async (_id, role) =>
    {
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
        } else {
            const updatedUsers = users.map(user =>
            {
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


    const handleActivity = async (_id, isActive) =>
    {
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
        } else {
        }
        const updatedUsers = users.map(user =>
        {
            if (user.email == res2.data.email) {
                return res2.data
            } else {
                return user
            }
        })
        setUsers(updatedUsers)
    }
    return (
        <>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>
                    <h5>User & roles </h5> <h6>[ Only root user can see this part. ]</h6>
                </span>
                <span >
                    <a className="btn btn-sm btn-warning" onClick={() => fetchUser()} style={{ display: 'flex', alignItems: 'center' }}>
                        Reload&nbsp;<i class="fas fa-sync"></i>
                    </a>
                </span>
            </div>

            <hr />
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created</th>
                        <th>Role [Type]</th>
                        <th>Actions <br />(Role | Active/deactivate)</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(item =>
                    {
                        return (
                            <tr key={item._id}>
                                <td>
                                    <img src={item.image} alt={item.username} width={'50px'} height={'auto'} />
                                </td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss')}</td>
                                <td>
                                    {item.role === 'root' && <span class="badge text-bg-primary" style={{ color: 'white' }}><b>{item.role} [{item.isActive ? 'A' : 'D'}]</b></span>}
                                    {item.role === 'admin' && <span class="badge text-bg-success" style={{ color: 'white' }}><b>{item.role} [{item.isActive ? 'A' : 'D'}]</b></span>}
                                    {item.role === 'user' && <span class="badge  text-bg-secondary" style={{ color: 'white' }}><b>{item.role} [{item.isActive ? 'A' : 'D'}]</b></span>}


                                </td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        {item.role !== 'root' &&
                                            <button type="button" class="btn btn-info btn-sm" onClick={() => handleRole(item._id, item.role)}
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                data-bs-custom-class="custom-tooltip"
                                                data-bs-title="This top tooltip is themed via CSS variables.">
                                                <i class="material-icons">accessibility</i>
                                            </button>
                                        }
                                        {(item?.role !== 'root' && item?.isActive) &&
                                            <button className='btn btn-sm btn-danger' onClick={() => handleActivity(item._id, item.isActive)}>
                                                <i class="material-icons">close</i>
                                            </button>
                                        }
                                        {(item?.role !== 'root' && !item?.isActive) &&
                                            <button className='btn btn-sm btn-success' onClick={() => handleActivity(item._id, item.isActive)}>
                                                <i class="material-icons">check</i>
                                            </button>
                                        }

                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </>
    )
}

export default UserRoles