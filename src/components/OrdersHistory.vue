<template>
  <div>
    <h2>История ордеров</h2>
    <div class="scroll-block">
      <table class="table">
        <thead>
          <th>Order ID</th>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Timestamp</th>
          <th>Side type</th>
          <th>Price</th>
          <th>Order Status</th>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows" :key="i">
            <td>{{ row.orderID }}</td>
            <td>{{ row.symbol }}</td>
            <td>{{ row.orderQty }}</td>
            <td>{{ new Date(row.timestamp) | date }}</td>
            <td>{{ row.side }}</td>
            <td>{{ row.price }}</td>
            <td>{{ row.ordStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import APIRequest from "@/apiReq";

export default {
  name: "OrderHistory",
  data: () => ({
    rows: [],
  }),
  created() {
    APIRequest("GET", "/order")
      .then((response) => {
        this.rows = response.data;
      })
      .catch((e) => {
        alert("Упс, что-то пошло не так");
        throw new Error(e);
      });
  },
};
</script>

<style lang="scss" scoped></style>
