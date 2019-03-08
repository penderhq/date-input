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
                className={this.props.className}
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
        styles: PropTypes.object,
        value: PropTypes.string,
        disabled: PropTypes.bool,
        includeTime: PropTypes.bool,
        sameTimeZone: PropTypes.bool,
        dateFormat: PropTypes.string,
        datePlaceholder: PropTypes.string,
        timeFormat: PropTypes.string,
        timePlaceholder: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    }

    static defaultProps = {
        disabled: false,
        includeTime: true,
        sameTimeZone: false,
        dateFormat: 'D/M/YYYY',
        datePlaceholder: 'dd/mm/yyyy',
        timeFormat: 'HH:mm',
        timePlaceholder: 'hh:mm',
        styles: {
            container: css`
                display: flex;
                align-items: center;
            `,
            dateInputContainer: css`
                display: flex;
            `,
            dateInput: css`
                background: none;
                border: none;
                -webkit-appearance: none;
            `,
            timeInputContainer: css`
                display: flex;
            `,
            timeInput: css`
                background: none;
                border: none;
                -webkit-appearance: none;
            `
        }
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
            <div className={this.props.styles.container}>
                <div className={this.props.styles.dateInputContainer}>
                    <Input
                        className={this.props.styles.dateInput}
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
                    <div className={this.props.styles.timeInputContainer}>
                        <Input
                            className={this.props.styles.timeInput}
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
        )
    }

    handleFocus = (e) => {
        this.setState({
            focus: true
        })
        if (this.props.onFocus) {
            this.props.onFocus(e)
        }
    }

    handleBlur = (e) => {
        this.setState({
            focus: false
        })
        if (this.props.onBlur) {
            this.props.onBlur(e)
        }
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