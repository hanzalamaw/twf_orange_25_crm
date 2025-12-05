<?php /** @var array $order */ ?>
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden !important;
    }

    body {
      font-family: Arial, sans-serif;
      font-size: 11px;
      margin: 0;
      padding: 0;
      color: #1f1f1f;
    }
    
    .container {
      margin: 0 auto;
      padding: 20px 40px;
      width: calc(100% - 80px);
      box-sizing: border-box;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header .left {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .header .right {
      text-align: right;
      margin-top: -2.8rem;
    }

    .header .right h1 {
      margin: 0;
    }
    
    .details {
      display: table;
      width: 100%;
      margin-top: 25px;
      font-size: 14px;
      table-layout: fixed;
    }

    .box {
      display: table-cell;
      padding: 12px;
      width: 33%;
      vertical-align: top;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    .label {
      font-weight: bold;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: 0.1rem solid #fff;
      margin-top: 25px;
      font-size: 15px;
      page-break-inside: avoid;
    }

    th, td {
      border-bottom: 1px solid #ccc;
      padding: 6px;
      text-align: left;
    }

    .totals {
      width: 100%;
      margin-top: 20px;
      font-size: 13px;
      line-height: 1;
    }

    .totals-row {
      width: 50%;
      font-size: 13px;
      margin: 2px 0;
      padding: 5px 0;
      margin-left: 20rem;
    }

    .totals-row span {
      display: inline-block;
      width: 48%;
    }

    .totals-row span:first-child {
      font-weight: bold;
      text-align: left;
    }

    .totals-row span:last-child {
      text-align: right;
    }

    .paid span {
      color: green;
      font-weight: bold;
    }

    .due span {
      color: red;
      font-weight: bold;
    }

    .section-title {
      margin-top: 30px;
      font-weight: bold;
      font-size: 12px;
    }

    .footer {
      width: 100%;
      border-top: 1px solid #ccc;
      padding-top: 8px;
      font-size: 11px;
      margin-top: 20px;
      page-break-inside: avoid;
      position: relative;
    }

    .footer-left {
      display: inline-block;
      width: 50%;
      text-align: left;
      font-weight: bold;
    }

    .footer-right {
      display: inline-block;
      width: 49%;
      text-align: right;
      white-space: nowrap;
    }

    .footer-right .divider {
      margin: 0 8px;
      color: #888;
    }

    small {
      color:rgb(107, 107, 107);
    }

    .payment-section {
      margin-top: 30px;
      font-size: 12px;
    }

    .section-title-line {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 11px;
      color: #333;
      border-bottom: 1px solid #ccc;
      padding-bottom: 4px;
      margin-bottom: 10px;
    }

    .payment-grid {
      display: block;
      margin-top: 1rem;
      margin-left: 1.2rem;
      width: 100%;
    }

    .payment-grid .label,
    .payment-grid .value {
      display: inline-block;
      width: 24.5%;
      vertical-align: top;
      margin-bottom: 5px;
    }

    .payment-grid .label {
      font-weight: bold;
      color: #000;
      text-transform: uppercase;
    }
    
    ol li {
      text-align: justify;
    }

  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="left">
        <h1>THE WARSI FARM</h1>
      </div>
      <div class="right">
        <h1>INVOICE</h1>
        <div><?= isset($order['order_id']) ? htmlspecialchars($order['order_id']) : '' ?></div>
      </div>
    </div>

    <div class="details">
      <div class="box" style="border-right: none; border-left: none;">
        <div class="label">Booking Date</div>
        <?= isset($order['booking_date']) ? htmlspecialchars($order['booking_date']) : '' ?><br><br>
        <div class="label">Issued Date</div>
        <?= date('Y-m-d') ?> 
      </div>
      <div class="box" style="border-right: none;">
        <div class="label">Billed to</div>
        <?= isset($order['name']) ? htmlspecialchars($order['name']) : '' ?><br>
        <?= isset($order['address']) ? htmlspecialchars($order['address']) : '' ?><br>
        <?= isset($order['contact']) ? htmlspecialchars($order['contact']) : '' ?>
      </div>
      <div class="box" style="border-right: none;">
        <div class="label">From</div>
        The Warsi Farm<br>
        0331-9911466<br>
        0332-9911466
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border-bottom: 1px solid #ccc !important;">
          <?= isset($order['order_type']) ? htmlspecialchars($order['order_type']) : '' ?> (<?= isset($order['weight']) ? htmlspecialchars($order['weight']) : '' ?>)<br>
          </td>
          <td><?= isset($order['quantity']) ? htmlspecialchars($order['quantity']) : '' ?></td>
          <td>PKR <?= isset($order['total_amount']) ? number_format($order['total_amount']) : '0' ?></td>
        </tr>
      </tbody>
    </table>

    <div class="totals">
      <div class="totals-row" style="border-bottom: 0.1rem solid #ccc; padding-top: 0.65rem;"><span class="label"> Subtotal:</span><span>PKR <?= isset($order['total_amount']) ? number_format($order['total_amount']) : '0' ?></span></div>
      <div class="totals-row" style="border-bottom: 0.1rem solid #ccc; padding-top: 0.65rem;"><span class="label">Shipping:</span><span>Free</span></div>
      <div class="totals-row" style="border-bottom: 0.1rem solid #ccc; padding-top: 0.65rem;"><span class="label">Total:</span><span>PKR <?= isset($order['total_amount']) ? number_format($order['total_amount']) : '0' ?></span></div>
      <div class="totals-row paid" style="padding-top: 0.65rem;"><span class="label">Amount Paid:</span><span>PKR <?= isset($order['received_amount']) ? number_format($order['received_amount']) : '0' ?></span></div>
      <div class="totals-row due" style="border-bottom: 0.1rem solid red; border-top: 0.1rem solid red; padding-top: 0.65rem;"><span class="label">Amount Due:</span><span>PKR <?= isset($order['pending_amount']) ? number_format($order['pending_amount']) : '0' ?></span></div>
    </div>

    <div class="payment-section">
      <div class="section-title-line">PAYMENT INFO</div>
      <div class="payment-grid">
        <div class="label" style="margin-right: 2rem; margin-left: -1rem;">ACCOUNT NAME (HBL)</div>
        <div class="label" style="margin-left: -2rem;">Branch</div>
        <div class="label" style="margin-right: 1rem;">IBAN</div>
        <div class="label" style="margin-left: 0.1rem;">Account No</div>

        <div class="value" style="margin-right: 2rem; margin-left: -1rem;">TW TRADERS</div>
        <div class="value" style="margin-left: -2rem;">ZIAUDDIN SHAHEED ROA</div>
        <div class="value" style="margin-right: 1rem;">PK10HABB0016787900655603</div>
        <div class="value" style="margin-left: 0.1rem;">16787900655603</div>
      </div>
</div>

    <div class="section-title-line" style="margin-top: 2rem;">Terms & Conditions</div>
    <ol style="font-size: 15px; margin-left: -1rem; margin-right: 0.7rem;">
      <li>Full payment is required before dispatch or at the time of delivery.</li>
      <li>Accepted payments: Cash (in-person), Bank Transfer, Easypaisa, JazzCash, and Online Checkout.</li>
      <li>Free delivery within Karachi; delivery date/time shared upon booking; delays due to weather or other issues will be communicated.</li>
      <li>Customers must provide accurate delivery details and ensure someone is available to receive the order.</li>
      <li>The Warsi Farm is not liable for delays due to uncontrollable factors like weather, road closures, or courier issues.</li>
      <li>Any genuine quality issue must be reported within 2 hours of delivery with photos for review.</li>
    </ol>

    <div class="footer">
  <div class="footer-left">The Warsi Farm</div>
  <div class="footer-right">
    <span>(0331 & 0332) - 9911466</span>
    <span class="divider">|</span>
    <span class="web">thewarsifarm.com</span>
  </div>
</div>
  </div>
</body>
<script>
  <?php if (isset($order['order_type']) && in_array($order['order_type'], ['Goat (Hissa)', 'Goat', 'Cow'])) : ?>
    document.getElementById("small").textContent = "Day <?= isset($order['day']) ? htmlspecialchars($order['day']) : '' ?>";
  <?php endif; ?>
</script>
</html>