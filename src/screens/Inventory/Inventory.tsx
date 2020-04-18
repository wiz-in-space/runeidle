import React, { CSSProperties } from 'react';
import { InventoryItem, InventoryStore } from 'data/InventoryStore';
import { inject, observer } from 'mobx-react';
import { Star } from 'shared_components/Star';
import { InventorySlot } from './InventorySlot';

interface Props {
    inventoryStore?: InventoryStore;
}

@inject('inventoryStore')
@observer
export class Inventory extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <div style={styles.container}>
                {this.props.inventoryStore!.inventory.map((item) => {
                    return <InventorySlot item={item} />;
                })}
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        border: '3px solid black',
        padding: 20,
        margin: 20,
        width: 760,
    } as CSSProperties,
};
