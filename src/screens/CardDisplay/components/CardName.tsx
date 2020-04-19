import React from 'react';
import { Star } from 'shared_components/Star';

export const CardName = (props: { name: string; starCount: number; styles: any }) => {
    return (
        <p style={{ ...props.styles.cardText, marginBottom: 10 }}>
            {props.name + ' '}
            {new Array(props.starCount).fill('').map((x, i) => {
                return <Star key={i} />;
            })}
        </p>
    );
};
