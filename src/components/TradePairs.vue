<template>
  <div>
    <h2>Валютные пары</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Валютная пара</th>
          <th scope="col">Значение</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="pair in pairs"
          :key="pair.symbol"
          @click="setSymbol(pair.symbol)"
        >
          <th scope="row">{{ pair.symbol }}</th>
          <td>{{ pair.lastPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import config from "@/config";
export default {
  name: "TradePairs",
  data: () => ({
    pairs: [],
  }),
  methods: {
    fetch() {
      this.$http
        .get("/instrument/active")
        .then((response) => {
          this.pairs = response.data;
          this.$store.commit("setSymbol", this.pairs[0].symbol);
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
    setSymbol(symbol) {
      this.$store.commit("setSymbol", symbol);
    },
  },
  created() {
    this.fetch();
  },
  beforeMount() {
    const socket = new WebSocket(config.socketUrl);

    socket.addEventListener("open", () => {
      socket.send(`{"op": "subscribe", "args": "instrument"}`);
    });

    socket.addEventListener("message", (res) => {
      const { data } = JSON.parse(res.data);
      if (data)
        data.forEach((item) => {
          if (!item.lastPrice) return;
          const index = this.pairs.findIndex(
            (pair) => pair.symbol === item.symbol
          );
          if (index === -1) this.pairs.push(item);
          else this.pairs[index].lastPrice = item.lastPrice;
        });
    });
  },
};
</script>

<style lang="scss" scoped></style>
