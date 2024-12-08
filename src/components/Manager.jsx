import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
const Manager = () => {
    const [password, setpassword] = useState({ website: '', username: '', password: '' })
    const [passwordArray, setpasswordArray] = useState([])
    const [isUpdating , setisUpdating]=useState(false);
    const [updateid,setUpdateid]=useState(null);

    const getPasswords = async  () => {
      let res=await fetch("http://localhost:3000")
      let passwords=await res.json();
      setpasswordArray(passwords)
      console.log(passwords)

    }
    
    useEffect(() => {
        getPasswords()
    }, [])

    const savePassword = async () => {
        console.log(password)
        if (password.website.length > 3 && password.username.length > 3 && password.password.length > 3) {
            let uid = uuidv4()
            if(isUpdating){
                // uid=updateid
                await fetch("http://localhost:3000", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id:updateid})
                });
                setisUpdating(false)
                setUpdateid(null)
            }

            setpassword({ website: '', username: '', password: '' })
            setpasswordArray([...passwordArray, { ...password, id: uid }])
            await fetch("http://localhost:3000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({ ...password, id: uid }) 
            });
            console.log([...passwordArray, { ...password, id: uid }])
            // localStorage.setItem('Passwords', JSON.stringify([...passwordArray, { ...password, id: uid }]))
            // setpassword({ website: '', username: '', password: '' })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }

    }
    const handleChange = (e) => {
        setpassword({ ...password, [e.target.name]: e.target.value })
    }
    const handleDelete = async  (id) => {
        // console.log("Deleting")
        setpasswordArray(passwordArray.filter(item => item.id != id))
        await fetch("http://localhost:3000", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id })
        });
        toast('Deleted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

    }
    const handleEdit = (id) => {
        // console.log("Deleting")
        setpassword(passwordArray.filter(item => item.id === id)[0])
        setisUpdating(true)
        setUpdateid(id)
        setpasswordArray(passwordArray.filter(item => item.id != id))
       

    }
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

    }
    return (
        <div className=' min-h-[calc(100vh-80px-60px)]'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-purple-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(165,124,206,0.13)_0,rgba(165,124,206,0)_50%,rgba(165,124,206,0)_100%)]"></div>

            <div className="container mx-auto flex flex-col gap-3  p-2 md:p-0 md:w-[70vw]">
                <div className='p-2 text-center m-2'>
                    <div className='text-3xl '><span className='text-purple-700'>&lt;</span>PassCode<span className='text-purple-700'>/&gt;</span></div>
                    <p className='text-xl m-1'>Your personal password manager</p>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <input type="text" value={password.website} onChange={handleChange} name='website' placeholder='Enter the website' className='rounded-lg p-1 w-full border border-purple-300 ' />
                    <div className='flex flex-col md:flex-row gap-3 w-full justify-between '>
                        <input type="text" value={password.username}
                            onChange={handleChange} name='username' placeholder='Enter Username' className='rounded-lg p-1 w-full border border-purple-300 ' />
                        <input type="password" value={password.password}
                            onChange={handleChange} name='password' placeholder='Enter Password' className='rounded-lg p-1  border border-purple-300  ' />
                    </div>
                    <button className='flex items-center justify-center bg-purple-400 rounded-3xl px-3 py-2' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            colors="primary:#242424,secondary:#a866ee"
                        >
                        </lord-icon>
                        <span>Save Password </span>
                    </button>
                </div>
                <div className='Saved Passwords my-2'>
                    <span className='text-2xl font-semibold'>Your Passwords</span>
                    {passwordArray.length === 0 && <div className='my-2 text-lg'>No saved Passwords</div>}
                    {passwordArray.length > 0 &&
                        <table className="table-auto my-2 w-full rounded-full">
                            <thead>
                                <tr className='bg-purple-500 text-white text-center' >
                                    <th>Website</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-purple-100'>
                                {
                                    passwordArray.map((item, index) => {
                                        return (
                                            <tr key={index} className="text-center">
                                                <td>
                                                    <div className='flex justify-center gap-2 '>
                                                        <a href={item.website} target="-blank">{item.website}</a>

                                                        <img src="copy.svg" alt="copy" width="25" height="25" className='cursor-pointer ' onClick={() => { handleCopy(item.website) }} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='flex justify-center gap-2 '>
                                                        {item.username}
                                                        <img src="copy.svg" alt="copy" width="25" height="25"
                                                            className='cursor-pointer ' onClick={() => { handleCopy(item.website) }} />
                                                    </div> </td>
                                                <td><div className='flex justify-center gap-2 '>
                                                    {item.password}
                                                    <img src="copy.svg" alt="copy" width="25" height="25"
                                                        className='cursor-pointer ' onClick={() => { handleCopy(item.website) }} />
                                                </div> </td>
                                                <td>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/exymduqj.json"
                                                        colors="primary:#121331,secondary:#8930e8"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                        onClick={()=>{handleEdit(item.id)}}>
                                                    </lord-icon>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/hwjcdycb.json"
                                                        trigger="hover"
                                                        className='cursor-pointer'
                                                        colors="primary:#121331,secondary:#8930e8"
                                                        style={{ width: "25px", height: "25px" }} onClick={() => { handleDelete(item.id) }} >

                                                    </lord-icon>

                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>

        </div>
    )
}

export default Manager
