import React from 'react';
import { Menu, Card, Grid, Container, Message, Button, Icon} from 'semantic-ui-react';

const Cartitem = props => {

    const {item_title, item_id, item_price, handle} = props;

    return (
        <div>
            {item_title} - Price : &pound;{item_price}
            <Icon onClick={() => handle(item_id)} name="trash alternate" size="large"/>
        </div>
    )

}

export default Cartitem;