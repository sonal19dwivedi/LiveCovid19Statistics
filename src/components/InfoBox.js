import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import '../styling/Infobox.css';

function InfoBox({title, cases, total, active, ...props}) {
    return (
        <Card className={`infoBox ${active && "infoBox--selected"}`} onClick = {props.onClick} >
            <CardContent>
            <Typography color="textSecondary" className="infoBox_title">
            {title}
            </Typography>
            <h2 className="infoBox_cases">{cases}</h2>
            {total ? <Typography className="infoBox_total" color="textSecondary">{total} Total</Typography> : ""}           
            </CardContent>
        </Card>
    )
}

export default InfoBox
