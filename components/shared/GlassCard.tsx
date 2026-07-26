interface Props{
    children:React.ReactNode
}

export default function GlassCard({children}:Props){

    return(

        <div className="
        rounded-3xl
        border
        border-white/40
        bg-white/70
        backdrop-blur-xl
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        ">

            {children}

        </div>

    )

}