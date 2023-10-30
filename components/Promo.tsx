import Image from "next/image";


interface IPromo {
    photoPath : string,
    text : string
}
export const Promo : React.FC<IPromo> = ({photoPath, text}) => {
    return (
        <div className={"min-w-[170px] max-w-[170px] aspect-[268/200] rounded-[20px] py-5 px-6 relative overflow-hidden cursor-pointer "}>
            <div className="text-[15px] font-semibold text-white relative z-30 keep-all">{text}</div>
            <Image src={photoPath} alt={""} fill objectFit={""} className={"filter brightness-75"}/>
        </div>
    );
};
