import "./Breadcrumbs.css";

import { FC } from "react";
import { IBreadcrumbs } from "./typing";
import { Link } from "react-router-dom";

export const Breadcrumbs: FC<IBreadcrumbs> = (props) => {
    const {
        endItem,
    } = props;
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={"/"} className="text-black">Главная</Link></li>
                {props.middleItems && !!props.middleItems.length ? (
                    <>
                        {props.middleItems.map((item) => {
                            return (
                                <li className="breadcrumb-item"><Link to={item.link} className="text-black">{item.name}</Link></li>
                            );
                        })
                        }
                    </>
                ) : (<></>)}
                <li className="breadcrumb-item active" aria-current="page">{endItem}</li>
            </ol>
        </nav>
    );
};