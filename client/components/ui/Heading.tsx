interface Props{

badge?:string;

title:string;

subtitle?:string;

center?:boolean;

}

export default function Heading({

badge,

title,

subtitle,

center=true

}:Props){

return(

<div className={center?"text-center":"text-left"}>

{badge&&(

<div className="mb-5">

<span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-[4px] text-blue-600">

{badge}

</span>

</div>

)}

<h2 className="text-5xl font-black leading-tight text-slate-900 lg:text-6xl">

{title}

</h2>

{subtitle&&(

<p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-600">

{subtitle}

</p>

)}

</div>

);

}