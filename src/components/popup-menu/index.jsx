import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import { BsCurrencyExchange } from "react-icons/bs";
import Swal from 'sweetalert2';

import './index.css';

const PopUp = () => {

    const viewComingSoon = () => {
        Swal.fire({
            icon: 'info',
            title: 'COMMING SOON',
            text: `OLOID Dex is coming soon.`
        })
    }

    return (
        <div className="G-App-header popup-menu flex col">
            <div className="flex link-item link-item-mint">
                <Link to='/mint' target="_self">
                    <FaCoins />
                    &nbsp;
                    &nbsp;
                    Mint
                </Link>
            </div>
            <div className="flex link-item link-item-dex">
                <Link to='/' target="_self" onClick={viewComingSoon}>
                    <BsCurrencyExchange />
                    &nbsp;
                    Swap
                </Link>
            </div>
        </div>
    )
}

export default PopUp;