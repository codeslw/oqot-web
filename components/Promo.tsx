import Image from "next/image";


interface IPromo {
    photoPath : string,
    text : string
}
export const Promo : React.FC<IPromo> = ({photoPath, text}) => {
    return (
        <div className={"w-full aspect-[268/200] rounded-[20px] py-5 px-6 relative overflow-hidden"}>
            <div className="text-xl-bold text-white relative z-30">{text}</div>
            <Image src={photoPath} alt={""} fill objectFit={"cover"} className={"filter backdrop-saturate-100 brightness-75"}/>
        </div>
    );
};
