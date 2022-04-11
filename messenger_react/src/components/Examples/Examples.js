import { useEffect, useState } from 'react';
// import React, { Component } from 'react'

export const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {

    }, []);

    return (
        <div>
            <h4>{count}</h4>
            <button onClick={() => setCount(count + 1)}>Click!</button>
        </div>
    );
};

// export class Counter extends React.Component {
//     state = {
//         count: 0,
//     };

//     headClick = () => this.setState({ count: this.state.count + 1 });

//     render() {
//         return (
//             <div>
//                 <h4>{this.state.count}</h4>
//                 <button onClick={this.headClick}>Click!</button>
//             </div>
//         );
//     }
// };