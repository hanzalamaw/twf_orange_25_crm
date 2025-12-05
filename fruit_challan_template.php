<?php /** @var array $order */ ?>
<div style="font-family: Arial, sans-serif; font-size: 12px;">
    <h2 style="width: 100%; text-align: center;">DELIVERY CHALLAN - THE WARSI FARM</h2>
    <p><strong>Customer ID:</strong> <?= $order['customer_id'] ?></p>
    <p><strong>Booking Name:</strong> <?= $order['name'] ?></p>
    <p><strong>Contact No:</strong> <?= $order['contact'] ?></p>
    <p><strong>Alternate No:</strong> <?= $order['alt_contact'] ?></p>
    <p><strong>Rider Name:</strong> ___________________________________</p>
    <p><strong>Vehicle:   </strong> ___________________________________</p>

    <h3>Order Info:</h3>
    <table width="100%" border="1" cellspacing="0" cellpadding="5">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Order Type</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><?= $order['order_id'] ?></td>
                <td><?= $order['order_type'] ?></td>
                <td><?= $order['weight'] ?></td>
                <td><?= $order['quantity'] ?></td>
                <td><?= $order['total_amount'] ?></td>
                <td style="max-width: 8rem; word-wrap: break-word; white-space: normal;">
                    <?= $order['address'] ?>
                </td>
            </tr>
        </tbody>
    </table>

    <div style="height: 80px;"></div>

    <table width="100%" style="margin-top: auto; margin-bottom: 3rem;">
        <tr>
            <td style="text-align: center;">________________________<br>Stamp</td>
            <td style="text-align: center;">________________________<br>Customer Signature</td>
            <td style="text-align: center;">________________________<br>Delivery Time</td>
        </tr>
    </table>

    <p style="margin-left: -4rem;">---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
</div>
