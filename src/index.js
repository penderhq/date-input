import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {css, cx} from 'emotion'
import moment from 'moment'

class Input extends React.Component {

    state = {
        value: ''
    }

    format(date) {
        if (!date || !date.isValid()) return ''
        if (this.props.isUTC) {
            date.utc()
        }
        return date.format(this.props.format)
    }

    componentWillMount() {
        this.setState({
            value: this.format(this.props.value)
        })
    }

    componentWillUpdate(nextProps) {

        if (this.props.value && !nextProps.value) {
            this.setState({
                value: ''
            })
            return
        }

        const a = this.format(this.props.value)
        const b = this.format(nextProps.value)

        if (a !== b) {
            this.setState({
                value: b
            })
        }
    }

    render() {

        return (
            <input
                className={cx(
                    css`
                    background: none;
                    border: none;
                    display: flex;
                    flex: 1 1 auto;
                    min-width: 0;
                    min-height: 0;
                `, this.props.className
                )}
                type="text"
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyPress={this.handleKeyPress}
            />
        )
    }

    handleKeyPress = (e) => {

        if (e.nativeEvent && e.nativeEvent.code && e.nativeEvent.code === 'Enter') {
            ReactDOM.findDOMNode(this).blur()
        }
    }

    handleChange = (e) => {

        this.setState({
            value: e.target.value
        })
    }

    handleFocus = () => {
        this.props.onFocus && this.props.onFocus()
    }

    handleBlur = () => {

        this.props.onBlur && this.props.onBlur()

        const createDate = this.props.isUTC ? moment.utc : moment

        const date = createDate(this.state.value, this.props.format)

        const value = this.format(date)

        this.setState({
            value
        })

        this.props.onChange(date.isValid() ? date : null)
    }
}

export default class DateInput extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.string,
        disabled: PropTypes.bool,
        includeTime: PropTypes.bool,
        sameTimeZone: PropTypes.bool,
        dateFormat: PropTypes.string,
        datePlaceholder: PropTypes.string,
        timeFormat: PropTypes.string,
        timePlaceholder: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    static defaultProps = {
        disabled: false,
        includeTime: true,
        sameTimeZone: false,
        dateFormat: 'D/M/YYYY',
        datePlaceholder: 'dd/mm/yyyy',
        timeFormat: 'HH:mm',
        timePlaceholder: 'hh:mm'
    }

    state = {
        focus: false
    }

    isUTC() {
        return this.props.sameTimeZone
    }

    getValue() {
        const createDate = this.isUTC() ? moment.utc : moment
        return this.props.value ? createDate(this.props.value) : null
    }

    render() {

        const {
            dateFormat,
            datePlaceholder,
            timeFormat,
            timePlaceholder,
            includeTime
        } = this.props

        const value = this.getValue()

        return (
            <div
                className={this.props.className}
            >
                <div
                    className={css`
                            display: flex;
                            flex: 1 1 auto;
                            min-width: 0;
                            min-height: 0;
                        `}
                >
                    <div
                        className={css`
                                display: flex;
                                flex: 1 1 auto;
                                min-width: 0;
                                min-height: 0;
                                flex-grow: 1;
                            `}
                    >
                        <Input
                            className={this.props.dateInputClassName}
                            disabled={this.props.disabled}
                            isUTC={this.isUTC()}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            placeholder={datePlaceholder}
                            format={dateFormat}
                            value={value}
                            onChange={this.handleDateChange}
                        />
                    </div>
                    {includeTime ? (
                        <div className="time-input-wrapper">
                            <Input
                                className={this.props.timeInputClassName}
                                disabled={this.props.disabled}
                                isUTC={this.isUTC()}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                placeholder={timePlaceholder}
                                format={timeFormat}
                                value={value}
                                onChange={this.handleTimeChange}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }

    handleFocus = () => {
        this.setState({
            focus: true
        })
    }

    handleBlur = () => {
        this.setState({
            focus: false
        })
    }

    handleDateChange = next => {

        if (!next) {
            this.setState({value: null})
            this.handleChange({
                value: null
            })
            return
        }

        const createDate = this.isUTC() ? moment.utc : moment

        const value = this.getValue() || createDate()

        value
            .date(next.date())
            .month(next.month())
            .year(next.year())

        this.handleChange({
            value
        })
    }

    handleTimeChange = next => {

        if (!next) {
            this.setState({value: null})
            this.handleChange({
                value: null
            })
            return
        }

        const createDate = this.isUTC() ? moment.utc : moment

        const value = this.getValue() || createDate()

        value
            .hour(next.hour())
            .minute(next.minute())

        this.handleChange({
            value
        })
    }

    handleChange = ({value}) => {

        this.props.onChange({
            value: value ? value.toISOString() : null
        })
    }
}