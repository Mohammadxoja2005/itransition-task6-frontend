import { FC, useEffect, useState } from 'react'
import {useAtom} from "jotai";
import {useUpdate} from "../../../../hooks/useUpdate"; 

interface messagesTypes {
    id: number,
    title: string,
    body: string,
    sender_id: number,
    receiver_id: number,
    joiner: { id: number, name: string }
}

const MESSAGESHOW: FC = () => {
    const [update,] = useAtom<any>(useUpdate);
    return (
        <div className='flex flex-col items-center'>
            {update && update.map((value: any) => {
                return (
                    <div className="flex justify-center mb-2" key={value.id}>
                        <div className="block w-96 max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
                            <h5 className="mb-2 cursor-pointer text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                {value.title}
                            </h5>
                            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                {value.body}
                            </p>
                            {/* <button
                                type="button"
                                className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                data-te-ripple-init=""
                                data-te-ripple-color="light"
                            >
                                Button
                            </button> */}
                        </div>
                    </div>
                )
            })

            }

        </div>
    )
}

export default MESSAGESHOW;