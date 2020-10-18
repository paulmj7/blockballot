import React, { useState } from "react";

export default function Ledger() {
    const [xActions, setXActions] = useState({});
    const handleClick = (event) => {
        event.preventDefault();
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
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}