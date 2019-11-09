import React, {Component} from 'react'
import {render} from 'react-dom'
import {css} from 'emotion'
import {injectGlobal} from 'emotion'
import {Canvas, Heading, Paragraph, Box} from '@pndr/demo-utils'
injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
        margin: 0;
    }
`

import DateInput from '../../src'

const now = new Date().toISOString()

class Example1 extends Component {

    state = {
        value: now,
        focus: false,
        userAgent: window.navigator.userAgent
    }

    render() {
        return <div>
            <Heading>
                Date & time
            </Heading>
            <Box>
                <DateInput
                    className={null}
                    value={this.state.value}
                    onFocus={() => this.setState({focus: true})}
                    onBlur={() => this.setState({focus: false})}
                    onChange={({value}) => {

                        this.setState({
                            value
                        })
                    }}
                />
            </Box>
            <Paragraph>
                State
            </Paragraph>
            <Box>
                <pre className={css`overflow: hidden;`}>
                {JSON.stringify(this.state, null, 2)}
            </pre>
            </Box>
        </div>
    }
}

class Example2 extends Component {

    state = {
        value: now,
        focus: false
    }

    render() {
        return <div>
            <Heading>
                Date without time
            </Heading>
            <Box>
                <DateInput
                    includeTime={false}
                    value={this.state.value}
                    onFocus={() => this.setState({focus: true})}
                    onBlur={() => this.setState({focus: false})}
                    onChange={({value}) => {

                        this.setState({
                            value
                        })
                    }}
                />
            </Box>
            <Paragraph>
                State
            </Paragraph>
            <Box>
                <pre>
                {JSON.stringify(this.state, null, 2)}
            </pre>
            </Box>
        </div>
    }
}

class Demo extends React.Component {

    componentDidMount() {

        const head = document.head.querySelector('[name=viewport]')
        head.content = "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=0"
    }

    render() {

        return (
            <Canvas>
                <Example1/>
                <Example2/>
            </Canvas>
        )
    }
}

render(<Demo/>, document.querySelector('#demo'))
