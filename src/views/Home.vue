<template>
  <section class="container">
    <div class="row">
      <div class="col-md-3">
        <trade-pairs />
      </div>
      <div class="col-md-6">
        <quotes-list :key="'quotes' + symbol" :socket="socket" v-if="symbol" />
      </div>
      <div class="col-md-3">
        <order-form />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <orders-history />
      </div>
    </div>
  </section>
</template>

<script>
import OrderForm from "../components/OrderForm.vue";
import OrdersHistory from "../components/OrdersHistory.vue";
import QuotesList from "../components/QuotesList.vue";
import TradePairs from "../components/TradePairs.vue";
import { mapState } from "vuex";
import config from "@/config";
export default {
  name: "Home",
  components: { TradePairs, QuotesList, OrdersHistory, OrderForm },
  data: () => ({
    socket: new WebSocket(config.socketUrl),
  }),
  computed: {
    ...mapState(["symbol"]),
  },
};
</script>
