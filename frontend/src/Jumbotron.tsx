import React, { useState } from "react";

export default function Jumbotron() {
    return (
        <div className="jumbotron">
            <h1 className="display-4">Finally, voting in the digital age.</h1>
            <p className="lead">It's beyond time that we upgrade our voting systems digitally to something that we can trust. With all the discussions about the safety of mail-in ballots during this 2020 election, a distributed ledger will provide the perfect security to our United States election.</p>
            <hr className="my-4"/>
            <p>On the page below is your 2020 ballot.</p>
            <a className="btn btn-primary btn-lg" href="#" role="button">Meet your candidates</a>
        </div>
    );
}