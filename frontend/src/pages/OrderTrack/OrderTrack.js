import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { trackOderById } from '../../services/orderService';
import NotFound from '../../components/NotFound/NotFound';
import OrderItemsList from '../../components/OrderItemList/OrderItemList';
import Title from '../../components/Title/Title';
import Map from '../../components/Map/Map';
import classes from './OrderTrack.module.css'
import DateTime from '../../components/DateTime/DateTime';

export default function OrderTrack() {
    const { orderId } = useParams();
    const [order, setOrder] = useState();

    useEffect(() => {
        orderId &&
            trackOderById(orderId).then(order => {
                setOrder(order);
            });
    }, []);

    if (!orderId)
        return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

    return (
        order && (
            <div className={classes.container}>
                <div className={classes.content}>
                    <h1>Order #{order.id}</h1>
                    <div className={classes.header}>
                        <div>
                            <strong>Date</strong>
                            <DateTime date={order.createdAt} />
                        </div>
                        <div>
                            <strong>Name</strong>
                            {order.name}
                        </div>
                        <div>
                            <strong>Address</strong>
                            {order.address}
                        </div>
                        <div>
                            <strong>State</strong>
                            {order.status}
                        </div>
                        {order.paymentId && (
                            <div>
                                <strong>Payment ID</strong>
                                {order.paymentId}
                            </div>
                        )}
                    </div>

                    <OrderItemsList order={order} />
                </div>

                <div>
                    <Title title="Your Location" fontSize="1.6rem" />
                    <Map location={order.addressLatLng} readonly={true} />
                </div>

                {order.status === 'NEW' && (
                    <div className={classes.payment}>
                        <Link to="/payment">Go To Payment</Link>
                    </div>
                )}
            </div>
        )
    )
}
