# DateInput

[![npm package][npm-badge]][npm]

Used for entering dates.

## Getting started

````
npm install @cmds/date-input --save
````

### Prop Types

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| className | String |  | Add a className to the input |
| value | String | | Dates are handled as ISO String values: `2020-01-24T12:00:41.021Z` |
| disabled | Boolean |  | Disables input. Default: `false` |
| includeTime | Boolean |  | Whether or not to include time. Default: `true` |
| sameTimeZone | Boolean |  | Whether the user is editing an UTC date or their local date. Default: `false` |
| dateFormat | String |  | Which date format to use for date parsing. Default: `D/M/YYYY`. See Date Formatting.  |
| datePlaceholder | String |  | Which placeholder to use for the date input. Default: `dd/mm/yyyy`. See Date Formatting. |
| timeFormat | String | | Which time format to use for date parsing. Default: `HH:mm`. See Date Formatting. |
| timePlaceholder | String |  | Which placeholder to use for the time input. Default: `hh:mm`. See Date Formatting. |
| onChange | Function |  | Triggers when the date changes: `({value: string})` |

### Date Formatting

For date formats go to [https://momentjs.com](https://momentjs.com)

### More information

This component is designed and developed as part of [Cosmos Design System][cmds]. 

[cmds]: https://github.com/entercosmos/cosmos
[npm-badge]: https://img.shields.io/npm/v/@cmds/date-input.svg
[npm]: https://www.npmjs.org/package/@cmds/date-input
