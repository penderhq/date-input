import React, {Component} from 'react'
import {render} from 'react-dom'
import {css} from 'emotion'
import {injectGlobal} from 'emotion'

injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    }
`

import DateInput from '../../src'

const now = new Date().toISOString()

class Example1 extends Component {

    state = {
        value: now
    }

    render() {
        return <div>
            <h2>
                Date & time
            </h2>
            <div
                className={css`
                    width: 200px;
                `}
            >
                <DateInput
                    className={null}
                    value={this.state.value}
                    onChange={({value}) => {

                        this.setState({
                            value
                        })
                    }}
                />
            </div>
            <h3>
                State
            </h3>
            <pre>
                {JSON.stringify(this.state, null, 2)}
            </pre>
        </div>
    }
}

class Example2 extends Component {

    state = {
        value: now
    }

    render() {
        return <div>
            <h2>
                Date without time
            </h2>
            <div
                className={css`
                    width: 200px;
                `}
            >
                <DateInput
                    className={null}
                    value={this.state.value}
                    onChange={({value}) => {

                        this.setState({
                            value
                        })
                    }}
                />
            </div>
            <h3>
                State
            </h3>
            <pre>
                {JSON.stringify(this.state, null, 2)}
            </pre>
        </div>
    }
}

class Demo extends React.Component {

    render() {

        return (
            <div>
                <h1>DateInput Demo</h1>
                <Example1/>
                <Example2/>
            </div>
        )
    }
}

render(<Demo/>, document.querySelector('#demo'))
