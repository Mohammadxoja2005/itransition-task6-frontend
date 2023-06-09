import { FC, useEffect } from 'react'
import { useAtom } from "jotai";
import { useUpdate } from "../../../../hooks/useUpdate";
import styles from "./index.module.scss";

const MESSAGESHOW: FC = () => {
    const [update,] = useAtom<any>(useUpdate);

    useEffect(() => {
        const messageBlock = document.querySelectorAll('.messageblock');

        messageBlock.forEach((value: any) => {
            let counter = 0;
            value.addEventListener("click", () => {
                counter++;
                if (counter % 2 == 1) {
                    value.childNodes[1].classList.add(styles.toggle_body);
                }

                if (counter % 2 == 0) {
                    value.childNodes[1].classList.remove(styles.toggle_body);
                }
            })
        })

    }, [update])

    return (
        <div className='flex flex-col items-center'>
            {update && update.map((value: any) => {
                return (
                    <div className="flex justify-center mb-2 " key={value.id}>
                        <div className="messageblock block w-96 max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700" data-index={value.id}>
                            <h5 className="mb-2 cursor-pointer text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                {value.title}
                            </h5>
                            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 hidden" data-role="body">
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
            })}
        </div>
    )
}

export default MESSAGESHOW;