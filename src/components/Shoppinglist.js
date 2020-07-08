import React, {useState} from 'react';
import data from '../data';
import Cart from "./Cart";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Menu, Card, Grid, Container, Message, Button, Icon} from 'semantic-ui-react'

const Shoppinglist = () => {

        const [cartData, setcartData] = useState([]);
        const [uniqueCartItemCount, setuniqueCartItemCount] = useState(0);
        const [hasAddedToCart, sethasAddedToCart] = useState(false);

        const parseData = data.map((item,key) => (

            <Grid.Column>
                <Card
                    image={item.productImageUrl}
                    header={item.title}
                    meta={'£' + item.price}
                    description={item.description}
                    extra={
                        <div key={key}>
                            <Button animated='vertical' onClick={() => addCart(item)}>
                                <Button.Content hidden>
                                    {hasAddedToCart ? <Icon name="check circle" color="green" /> : 'Add'}
                                </Button.Content>

                                <Button.Content visible>
                                    <Icon name='shop' />
                                </Button.Content>
                            </Button>

                        </div>
                    }
                />
            </Grid.Column>

        ));


    const addCart = (cartData) => {

                setuniqueCartItemCount(prevCount => prevCount + 1);
                const cartDataArr = {...cartData, uid: uniqueCartItemCount};
                setcartData(state => [...state, cartDataArr]);
                sethasAddedToCart(true);

                setTimeout(() => {
                    sethasAddedToCart(false);
                }, 1000)

        }

        const removeItem = (id) => {
            setcartData(state => [...state].filter( (cartItem) => cartItem.uid !== id));
        }

        return(
            <div>
                    <Router>
                        <Menu tabular>
                            <Link to="/">
                                <Menu.Item name='Home'>Home</Menu.Item>
                            </Link>
                            <Link to="/cart">
                                <Menu.Item name='Cart'>Cart</Menu.Item>
                            </Link>
                        </Menu>

                        <Switch>

                            <Route path="/cart">
                                {cartData.length > 0 &&
                                    <Container>
                                        <Cart data={cartData}
                                              handle={removeItem}
                                        />
                                    </Container>
                                }

                                {cartData.length === 0 &&
                                    <Container>
                                        <Message>
                                            <Message.Header>No Items In Cart !</Message.Header>
                                        </Message>
                                    </Container>
                                }
                            </Route>
                            <Route path="/">
                                {data.length &&

                              <Container>
                                <Grid columns={3}>
                                    <Grid.Row>
                                        {parseData}
                                    </Grid.Row>
                                </Grid>
                              </Container> }

                              {cartData.length > 0 &&
                                <Container>
                                    <br/><br/>
                                    <Message>
                                        <Message.Header>Items in cart: {cartData.length}</Message.Header>
                                    </Message>
                                </Container>
                              }

                            </Route>
                        </Switch>
                    </Router>

            </div>
        )
}

export default Shoppinglist;