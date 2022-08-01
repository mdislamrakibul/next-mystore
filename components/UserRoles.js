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
                    <a class="waves-effect waves-light btn #d81b60 pink darken-1" onClick={() => fetchUser()} style={{ display: 'flex', alignItems: 'center' }}>
                        Reload&nbsp;<i class="material-icons">refresh</i>
                    </a>
                </span>
            </div>

            <hr />
            <table className="highlight">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created</th>
                        <th>Role [Type]</th>
                        <th>Cng. Role</th>
                        <th>Act./Deact.</th>
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
                                    {item.role === 'root' && <span class="badge red" style={{ color: 'white' }}><b>{item.role} [{item.isActive ? 'A' : 'D'}]</b></span>}
                                    {item.role === 'admin' && <span class="badge green" style={{ color: 'white' }}><b>{item.role} [{item.isActive ? 'A' : 'D'}]</b></span>}
                                    {item.role === 'user' && <span class="badge  blue" style={{ color: 'white' }}><b>{item.role} [{item.isActive ? 'A' : 'D'}]</b></span>}


                                </td>
                                <td>
                                    {item.role !== 'root' &&
                                        <button className="btn-floating btn-large waves-effect waves-light #8e24aa btn-small tooltipped" data-position="bottom" data-tooltip="I am a tooltip"
                                            onClick={() => handleRole(item._id, item.role)}>
                                            <i class="material-icons">accessibility</i>
                                        </button>
                                    }

                                </td>
                                <td>
                                    {(item?.role !== 'root' && item?.isActive) &&
                                        <button className="btn-floating btn-large waves-effect waves-light red btn-small tooltipped" data-position="bottom" data-tooltip="I am a tooltip"
                                            onClick={() => handleActivity(item._id, item.isActive)}>
                                            <i class="material-icons">close</i>
                                        </button>
                                    }
                                    {(item?.role !== 'root' && !item?.isActive) &&
                                        <button className="btn-floating btn-large waves-effect waves-light green btn-small tooltipped" data-position="bottom" data-tooltip="I am a tooltip"
                                            onClick={() => handleActivity(item._id, item.isActive)}>
                                            <i class="material-icons">check</i>
                                        </button>
                                    }

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