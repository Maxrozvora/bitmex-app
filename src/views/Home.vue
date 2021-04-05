<template>
  <section class="container">
    <div class="row">
      <div class="col-3">
        <trade-pairs />
      </div>
      <div class="col-6">
        <quotes-list :key="'quotes' + symbol" />
      </div>
      <div class="col-3">
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
export default {
  name: "Home",
  components: { TradePairs, QuotesList, OrdersHistory, OrderForm },
  computed: {
    ...mapState(["symbol"]),
  },
};
</script>
 