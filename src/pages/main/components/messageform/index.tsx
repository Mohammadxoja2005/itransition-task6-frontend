import { FC, useState, useEffect } from 'react'
import axios from "axios";
import io from "socket.io-client";
import { useAtom } from "jotai";
import { useUpdate } from "../../../../hooks/useUpdate";

const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

interface allNamesInterface {
    id: number,
    name: string
}

const MESSAGEFORM: FC = () => {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [receieverInfo, setReceiverInfo] = useState<{ name: string, id: number }>();
    const [allNames, setAllNames] = useState<Array<allNamesInterface>>([]);
    const [possibleNames, setPossibleNames] = useState<Array<allNamesInterface>>([]);
    const [update, setUpdate] = useAtom(useUpdate);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/join`).then((res) => {
            setAllNames(res.data);
        })
        
        socket.emit('receive_user_id', {receiver_id: localStorage.getItem("userIndex")})
        
        socket.on('receive_message', (data) => { 
            setUpdate(data);
        })

    }, [socket])

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log("clicked");
        socket.emit('send_message', {
            title: title,
            body: body,
            sender_id: localStorage.getItem("userIndex"),
            receiver_id: receieverInfo?.id
        })
    }

    const recInfo = (id: number, name: string) => {
        setReceiverInfo({ name: name, id: id })
        setPossibleNames([]);
    }

    const setRec = (name: string) => {
        const res = allNames.filter((value) => value.name.toLowerCase().includes(name));
        // setReceiverId(res[0]?.id); 
        setPossibleNames(res)
    }

    return (
        <>
            <div className="relative block max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 m-auto mb-3">
                <form>
                    <div className="relative mb-6" data-te-input-wrapper-init="">
                        <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleInput7"
                            placeholder="Name"
                            onChange={(e: any) => setRec(e.target.value)}
                        />

                        <label
                            htmlFor="exampleInput7"
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                        >
                            Name - {receieverInfo?.name}
                        </label>
                    </div>
                    {/* <div className="flex justify-center">
                        <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 w-96 ">
                            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Card title
                            </h5>
                        </div>
                    </div>  */}
                    {possibleNames.length === 0 ? null :
                        <div className="flex justify-center absolute bg-white z-10 border border-sky-500 ml-1">

                            <ul className="w-96">
                                {possibleNames && possibleNames.map((value) => {
                                    return (
                                        <li onClick={() => recInfo(value.id, value.name)} key={value.id} className=" cursor-pointer w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                            {value.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    <div className="relative mb-6" data-te-input-wrapper-init="">
                        <input
                            type="email"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleInput8"
                            placeholder="Email address"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label
                            htmlFor="exampleInput8"
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                        >
                            Theme
                        </label>
                    </div>
                    <div className="relative mb-6" data-te-input-wrapper-init="">
                        <textarea
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlTextarea13"
                            rows={3}
                            placeholder="Message"
                            defaultValue={""}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <label
                            htmlFor="exampleFormControlTextarea13"
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                        >
                            Message
                        </label>
                    </div>
                    {/* <div className="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
                    <input
                        className="relative float-left mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary"
                        type="checkbox"
                        defaultValue=""
                        id="exampleCheck10"
                    />
                    <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="exampleCheck10"
                    >
                        Send me a copy of this message
                    </label>
                </div> */}
                    <button
                        type="submit"
                        className="w-full rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        data-te-ripple-init=""
                        data-te-ripple-color="light"
                        onClick={(e) => onSubmit(e)}
                    >
                        Send
                    </button>
                </form>

            </div>
        </>


    )
}

export default MESSAGEFORM;