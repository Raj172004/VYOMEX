import { ReactNode } from "react";

interface Props{
    children:ReactNode;
    className?:string;
}

export default function Container({
    children,
    className=""
}:Props){

    return(

        <div
        className={`mx-auto w-full max-w-[1320px] px-6 lg:px-8 ${className}`}
        >
            {children}
        </div>

    );

}