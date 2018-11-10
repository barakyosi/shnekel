import React from "react";


import {
    FormControl,
    FormHelperText,
    InputLabel,
    Select
} from "@material-ui/core";

const SelectField = ({input: { name, onChange, value, ...restInput },
                    meta,
                    children,
                    fullWidth,
                    margin,
                    onSelect,
                    ...rest}) => (
    <FormControl fullWidth={fullWidth} margin={margin}>
        <InputLabel htmlFor={`Select__${name}`}>Category</InputLabel>
        <Select
            {...rest}
            name={name}
            error={meta.error && meta.touched}
            inputProps={{...restInput, id: `Select__${name}`}}
            value={value}
            onChange={onChange}
        >
            {children}
        </Select>
        {meta.error &&
        meta.touched && (
            <FormHelperText error={true}>{meta.error}</FormHelperText>
        )}
    </FormControl>
);

export default SelectField;