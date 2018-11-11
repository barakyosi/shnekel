import React from "react";


import {
    FormControl,
    FormHelperText,
    InputLabel,
    Select
} from "@material-ui/core";
import CreateCategory from './CreateCategory';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

const SelectCategoryField = ({input: { name, onChange, value, ...restInput },
                    meta,
                    children,
                    fullWidth,
                    margin,
                    ...rest}) => (
    <FormControl fullWidth={fullWidth} margin={margin}>
        <InputLabel htmlFor={'SelectCategoryField'}>Category</InputLabel>

        <CreateCategory open={value === 'CREATE'} onClose={() => onChange(null)} onCreate={(category) => onChange(category.id)} />

        <Select
            {...rest}
            name={name}
            error={meta.error && meta.touched}
            inputProps={{...restInput, id: 'SelectCategoryField'}}
            value={value}
            onChange={onChange}
        >
            <MenuItem key="CREATE" value="CREATE">CREATE</MenuItem>
            {children}
        </Select>
        {meta.error &&
        meta.touched && (
            <FormHelperText error={true}>{meta.error}</FormHelperText>
        )}
    </FormControl>
);

export default SelectCategoryField;