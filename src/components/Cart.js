import React, {useState, useEffect} from 'react';
import { Menu, Card, Grid, Container, Message, Button, Icon, Item, Divider} from 'semantic-ui-react';

const Cart = props => {

    const cartCount = props.data.length;
    const [price, setPrice] = useState(0);

    const mapCartItemComponent = props.data.map((cartItem, index) => {
        const {title, price, uid} = cartItem;

        return (
                <Item>
                    <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                    <Item.Content>
                        <Item.Header as='a'>{title}</Item.Header>
                        <Item.Meta>&pound;{price}</Item.Meta>
                        <Item.Extra>
                            <Icon onClick={() => props.handle(uid)} name="trash alternate" size="large"/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            );

    });

    useEffect(() => {

        if(props.data.length) {
            const calculatePrice = () => {
                const priceArr = props.data.map((cartItem) => {
                    return cartItem.price;
                });
                return priceArr.reduce((a, b) => a + b).toFixed(2);
            }

            setPrice(calculatePrice());
        }

    }, [props.data]);

   return (
       <Container>
           <Item.Group>
               {mapCartItemComponent}
           </Item.Group>
           <Message>
               <Message.Header>Items: {cartCount}</Message.Header>
           </Message>
           <Divider/>
           <Message>
               <Message.Header>Cart Total: &pound;{price}</Message.Header>
           </Message>
       </Container>
   )
}

export default Cart;