import { FC, useState } from 'react'
import axios from "axios";
import io from "socket.io-client";
const socket = io(`http://localhost:3005/`);

const LOGIN: FC = () => {
  const [name, setName] = useState<string>('');

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (name == "") {
      alert("name needs to be filled");
      return;
    }

    socket.emit("register_user", { name: name });

    socket.on("get_user_id", (data) => {
      localStorage.setItem("userIndex", data.id);
      window.location.reload();
    })

    // socket.on("get_all_users", (data) => {
    //   console.log(data);
    // })

    // axios.post(`${process.env.REACT_APP_BACKEND_URL}/join`, {
    //   name: name
    // })
    //   .then((res) => {

    //     if (res.data != null) {
    //       localStorage.setItem("userIndex", res.data);
    //       window.location.reload();
    //     }
    //     const userIndex = localStorage.getItem('userIndex');

    //     return userIndex;

    //   })
  }

  return (
    <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 m-auto">
      <form>
        <div className="relative mb-6" data-te-input-wrapper-init="">
          <input
            type="text"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleInput90"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="exampleInput90"
            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
          >
            Name
          </label>
        </div>
        {/* <div className="relative mb-6" data-te-input-wrapper-init="">
      <input
        type="email"
        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleInput91"
        placeholder="Email address"
      />
      <label
        htmlFor="exampleInput91"
        className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
      >
        Email address
      </label>
    </div> */}
        {/* <div className="mb-6 flex min-h-[1.5rem] items-center justify-center pl-[1.5rem]">
      <input
        className="relative float-left mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary"
        type="checkbox"
        defaultValue=""
        id="exampleCheck11"
      />
      <label
        className="inline-block pl-[0.15rem] hover:cursor-pointer"
        htmlFor="exampleCheck11"
      >
        I have read and agree to the terms
      </label>
    </div> */}
        <button
          type="submit"
          className="w-full rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          data-te-ripple-init=""
          data-te-ripple-color="light"
          onClick={(e) => onSubmit(e)}
        >
          Enter with name
        </button>
      </form>
    </div>
  )
}

export default LOGIN;