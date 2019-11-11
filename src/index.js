import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { css, cx } from 'emotion'
import moment from 'moment'

const getNativeUIAvailable = () => /iPad|iPhone|iPod|Android/i.test(window.navigator.userAgent)

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

    focus = () => {
        this.refs.input.click()
        this.refs.input.focus()
    }

    render() {

        return (
            <input
                ref={'input'}
                className={this.props.className}
                type="text"
                inputMode={'numeric'}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onClick={this.handleClick}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyPress={this.handleKeyPress}
            />
        )
    }

    handleClick = (e) => {
        if (this.props.onClick) {
            this.props.onClick(e)
        }
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

    handleFocus = (e) => {
        this.props.onFocus && this.props.onFocus(e)
    }

    handleBlur = (e) => {

        this.props.onBlur && this.props.onBlur(e)

        const createDate = this.props.isUTC ? moment.utc : moment

        const date = createDate(this.state.value, this.props.format)

        const value = this.format(date)

        this.setState({
            value
        })

        this.props.onChange(date.isValid() ? date : null)
    }
}

class AdaptiveDateInput extends React.Component {

    render() {
        return (
            <React.Fragment>
                {this.props.enableNativeUI ? (
                    <input
                        ref={'nativeInput'}
                        type="date"
                        className={css`
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            opacity: 0;
                        `}
                        value={this.props.value ? this.props.value.format('YYYY-MM-DD') : ''}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                ) : null}
                <Input
                    {...this.props}
                    ref={ref => this.input = ref}
                />
                {this.props.enableNativeUI ? (
                    <div
                        className={css`
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                        `}
                        onClick={this.handleChooseDateNatively}
                    />
                ) : null}
            </React.Fragment>
        )
    }

    focus = () => {
        if (this.props.enableNativeUI) {
            this.refs.nativeInput.click()
            this.refs.nativeInput.focus()
        } else {
            this.input.click()
            this.input.focus()
        }
    }

    handleFocus = e => {
        this.props.onFocus(e)
        this.safariFix(e.nativeEvent.target)
    }

    handleBlur = e => this.props.onBlur(e)

    safariFix = (target) => {

        // Fix for Safari on mobile
        // https://github.com/facebook/react/issues/8938
        setTimeout(() => {
            target.defaultValue = ""
        }, 0)
    }

    handleChooseDateNatively = () => {

        this.refs.nativeInput.click()
        this.refs.nativeInput.focus()
    }

    handleChange = e => {

        const value = e.target.value

        const target = e.nativeEvent.target

        this.safariFix(target)

        if (!value) {
            this.props.onChange(null)
            return
        }

        const createDate = this.props.isUTC ? moment.utc : moment

        const date = createDate(value, 'YYYY-MM-DD')

        this.props.onChange(date.isValid() ? date : null)
    }
}

class AdaptiveTimeInput extends React.Component {

    render() {

        return (
            <React.Fragment>
                {this.props.enableNativeUI ? (
                    <input
                        ref={'nativeInput'}
                        type="time"
                        className={css`
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            opacity: 0;
                        `}
                        value={this.props.value ? this.props.value.format('HH:mm') : ''}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                    />
                ) : null}
                <Input
                    {...this.props}
                    ref={ref => this.input = ref}
                />
                {this.props.enableNativeUI ? (
                    <div
                        className={css`
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                        `}
                        onClick={this.handleChoose}
                    />
                ) : null}
            </React.Fragment>
        )
    }

    focus = () => {
        if (this.props.enableNativeUI) {
            this.refs.nativeInput.click()
            this.refs.nativeInput.focus()
        } else {
            this.input.click()
            this.input.focus()
        }
    }

    handleFocus = (e) => {
        this.props.onFocus(e)
        this.safariFix(e.nativeEvent.target)
    }

    handleBlur = e => this.props.onBlur(e)

    safariFix = (target) => {

        // Fix for Safari on mobile
        // https://github.com/facebook/react/issues/8938
        setTimeout(() => {
            target.defaultValue = ""
        }, 0)
    }

    handleChange = e => {

        const value = e.target.value

        const target = e.nativeEvent.target

        this.safariFix(target)

        if (!value) {
            this.props.onChange(null)
            return
        }

        const createDate = this.props.isUTC ? moment.utc : moment

        const date = createDate(value, 'HH:mm')

        this.props.onChange(date.isValid() ? date : null)
    }

    handleChoose = () => {

        this.refs.nativeInput.click()
        this.refs.nativeInput.focus()
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
        onBlur: PropTypes.func,
        enableNativeUI: PropTypes.bool
    }

    static defaultProps = {
        enableNativeUI: getNativeUIAvailable(),
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
                position: relative;
            `,
            dateInput: css`
                position: relative;
                background: none;
                border: none;
                -webkit-appearance: none;
                font-size: 16px;
                width: 100%;
            `,
            dateInputFocus: css`
                background-color: rgba(0, 119, 255, 0.1);
            `,
            timeInputContainer: css`
                display: flex;
                position: relative;
            `,
            timeInput: css`
                position: relative;
                background: none;
                border: none;
                -webkit-appearance: none;
                font-size: 16px;
                width: 100%;
            `,
            timeInputFocus: css`
                background-color: rgba(0, 119, 255, 0.1);
            `,
        }
    }

    state = {
        focus: false,
        focusedInput: null
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
            includeTime,
            enableNativeUI
        } = this.props

        const value = this.getValue()

        return (
            <div className={this.props.styles.container}>
                <div className={this.props.styles.dateInputContainer}>
                    <AdaptiveDateInput
                        enableNativeUI={enableNativeUI}
                        className={cx(
                            this.props.styles.dateInput,
                            this.state.focusedInput === 'date' ? this.props.styles.dateInputFocus : null
                        )}
                        ref={this.props.onDateInputRef}
                        disabled={this.props.disabled}
                        isUTC={this.isUTC()}
                        onClick={this.handleDateInputClick}
                        onFocus={this.handleDateInputFocus}
                        onBlur={this.handleDateInputBlur}
                        placeholder={datePlaceholder}
                        format={dateFormat}
                        value={value}
                        onChange={this.handleDateChange}
                    />
                </div>
                {includeTime ? (
                    <div className={this.props.styles.timeInputContainer}>
                        <AdaptiveTimeInput
                            enableNativeUI={enableNativeUI}
                            className={cx(
                                this.props.styles.timeInput,
                                this.state.focusedInput === 'time' ? this.props.styles.dateInputFocus : null
                            )}
                            ref={this.props.onTimeInputRef}
                            disabled={this.props.disabled}
                            isUTC={this.isUTC()}
                            onClick={this.handleTimeInputClick}
                            onFocus={this.handleTimeInputFocus}
                            onBlur={this.handleTimeInputBlur}
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

    handleDateInputClick = (e) => {
        if (!this.props.onClick) {
            return
        }
        this.props.onClick({
            input: 'date',
            e
        })
    }

    handleTimeInputClick = (e) => {
        if (!this.props.onClick) {
            return
        }
        this.props.onClick({
            input: 'time',
            e
        })
    }

    handleDateInputFocus = (e) => {
        this.setState({
            focusedInput: 'date'
        })
        this.handleFocus({
            input: 'date',
            e
        })
    }

    handleDateInputBlur = (e) => {
        this.setState({
            focusedInput: null
        })
        this.handleBlur({
            input: 'date',
            e
        })
    }

    handleTimeInputFocus = (e) => {
        this.setState({
            focusedInput: 'time'
        })
        this.handleFocus({
            input: 'time',
            e
        })
    }

    handleTimeInputBlur = (e) => {
        this.setState({
            focusedInput: null
        })
        this.handleBlur({
            input: 'time',
            e
        })
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
            this.setState({ value: null })
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
            this.setState({ value: null })
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

    handleChange = ({ value }) => {

        this.props.onChange({
            value: value ? value.toISOString() : null
        })
    }
}