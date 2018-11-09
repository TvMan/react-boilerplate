import React, { Component } from "react";
import "./Index.style.less";
import { Greetings } from "components/Greetings/Greetings";

export class Index extends Component<{}, {}> {
    render(): React.ReactNode {
        return (
            <div className="index">
                {process.env.API_URL}
                <div className="index__bg" />
                <img className="index__img" src={require("./../../public/images/home.png")} />
                <Greetings></Greetings>
            </div>
        );
    }
}