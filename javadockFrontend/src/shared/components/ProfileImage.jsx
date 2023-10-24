import defaultProfileImage from "@/assets/avatars/avatar1.png";

export function ProfıleImage({ width }){

    return (
        <>
            <img src={defaultProfileImage} width={width} className="img-fluid rounded-circle"/>
        </>
    )
}