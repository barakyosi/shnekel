import React from "react";

import FormControl from "@material-ui/core/FormControl";

import { DatePicker as DatePickerX } from "material-ui-pickers";

export default ({
                                   input: { name, onChange, onBlur, value, ...restInput },
                                   meta,
                                   children,
                                   label,
                                   fullWidth,
                                   margin,
                                   InputLabelProps,
                                   ...rest
                               }) => (
    <FormControl fullWidth={fullWidth} margin={margin}>
        {/*{label && (*/}
            {/*<InputLabel error={meta.error && meta.touched} {...InputLabelProps}>*/}
                {/*{label}*/}
            {/*</InputLabel>*/}
        {/*)}*/}
        {/*{label && <br />}*/}
        <DatePickerX
            {...rest}
            name={name}
            error={meta.error && meta.touched}
            helperText={meta.touched ? meta.error : undefined}
            inputProps={restInput}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            label="Date"
        />
    </FormControl>
);
