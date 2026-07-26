interface Props{
    title:string
    subtitle:string
}

export default function SectionHeading({
    title,
    subtitle,
}:Props){

    return(

        <div className="mx-auto mb-16 max-w-3xl text-center">

            <h2 className="text-4xl font-bold lg:text-5xl">
                {title}
            </h2>

            <p className="mt-5 text-lg text-slate-600">
                {subtitle}
            </p>

        </div>

    )

}