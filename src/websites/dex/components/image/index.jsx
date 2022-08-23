import React, {useEffect, useState} from "react"
import BinanceCoin from '../../assets/images/bnb.png';

const Image = ({alt, classname, src, fallbackSrc, binanceCoin = false}) => {

    const [source, setSource] = useState(src);

    useEffect(() => {
        setSource(src);
    }, [src])

    return(
        !binanceCoin ? 
        <img alt={alt} className={classname} src={source} onError={() => setSource(fallbackSrc)}/>:
        <img alt={alt} className={classname} src={BinanceCoin} onError={() => setSource(fallbackSrc)}/>
    )
}

export default Image;