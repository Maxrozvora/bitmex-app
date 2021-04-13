<template>
  <div>
    <h2 class="card-title">Создание ордера</h2>
    <div class="card">
      <table class="table">
        <tbody>
          <tr>
            <td>Пара</td>
            <td>{{ symbol }}</td>
          </tr>
          <tr>
            <td>Колличество</td>
            <td>
              <input
                class="form-control"
                type="number"
                step="1"
                v-model="orderQty"
              />
            </td>
          </tr>
          <tr>
            <td>
              <button
                class="btn btn-primary w-100"
                @click="submit('Buy')"
                :disabled="availableQty"
              >
                Buy
              </button>
            </td>
            <td>
              <button
                class="btn btn-success w-100"
                @click="submit('Sell')"
                :disabled="availableQty"
              >
                Sell
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import APIRequest from "@/apiReq";
export default {
  name: "OrderForm",
  data: () => ({
    orderQty: 1,
  }),
  computed: {
    ...mapState(["symbol"]),
    availableQty() {
      return !(this.orderQty > 0);
    },
  },
  methods: {
    submit(type) {
      APIRequest("POST", "/order", {
        orderType: "Market",
        symbol: this.symbol,
        orderQty: this.orderQty,
        side: type,
      })
        .then(() => {
          alert("Операция прошла успешно");
          this.orderQty = 1;
        })
        .catch((e) => {
          alert(e.message);
          throw new Error(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
