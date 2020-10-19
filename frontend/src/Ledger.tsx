import React, { useState } from "react";

function tableBody(data) {
    let i = 0;
    return (
        <tbody>
            {data.slice(1, data.length).map(function(item, key) {
                return (
                    <tr key={key}>
                        <th scope="row">{++i}</th>
                        <td>{item.gov_id}</td>
                        <td>{item.name}</td>
                        <td>{item.ballot}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default function Ledger() {
    const [xActions, setXActions] = useState([]);
    const handleClick = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/chain")
        .then(res => res.json())
        .then(data => {
            setXActions(data);
        });
    }
    const reloadButton = (
        <div>
            <button className="btn btn-primary reload-button" onClick={handleClick}>Reload</button>
        </div>
    )
    return (
        <div>
            {reloadButton}
            <table className="table ledger-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Gov ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Vote</th>
                    </tr>
                </thead>
                {tableBody(xActions)}
            </table>
        </div>
    )
}