import React, { Component } from "react";

interface IFormState {
    gov_id: string,
    name: string,
    ballot: string
}

class BallotForm extends Component<{}, IFormState> {
    constructor() {
        super({});
        this.state = {
            gov_id: "",
            name: "",
            ballot: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleChange(event: { target: { name: keyof IFormState ; value: any; }; }) {
        const state = { [event.target.name]: event.target.value } as Pick<IFormState, keyof IFormState>;
        this.setState(state);
    };
    handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:3000/new_transaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        });
        this.setState({
            gov_id: "",
            name: "",
            ballot: ""
        });
    };
    render() {
        return (
            <div className="ballot-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Government ID</label>
                        <input type="text" className="form-control" name="gov_id" value={this.state.gov_id} placeholder="Enter Government ID" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Name</label>
                        <input type="text" name="name" className="form-control" value={this.state.name} placeholder="Enter Full Name" onChange={this.handleChange}/>
                    </div>
                    <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="John Smith"
                            name="ballot"
                            checked={this.state.ballot === "John Smith"}
                            onChange={this.handleChange}
                            />
                            John Smith
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Jessica Adams"
                            name="ballot"
                            checked={this.state.ballot === "Jessica Adams"}
                            onChange={this.handleChange}
                            />
                            Jessica Adams
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Pablo Sandoval"
                            name="ballot"
                            checked={this.state.ballot === "Pablo Sandoval"}
                            onChange={this.handleChange}
                            />
                            Pablo Sandoval
                        </label>
                        </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    };
};

export default BallotForm;