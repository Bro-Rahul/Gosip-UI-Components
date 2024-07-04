import React from "react";

const DefaultImage:React.FC<{username:string}> = (props)=>  (
    <div className='default-avatar'>
        {props.username[0]}
    </div>
)
export default DefaultImage;