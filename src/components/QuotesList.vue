<template>
  <div>
    <h2>Список котировок</h2>
    <div class="text-center mt-5" v-if="loading">
      <div
        class="spinner-border"
        role="status"
        style="width: 4rem; height: 4rem"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="scroll-block" v-else>
      <table class="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Gross Value</th>
          </tr>
        </thead>
        <tbody v-if="!list.length">
          <tr>
            <td colspan="6">
              <div class="alert alert-info" role="alert">Нет данных</div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(item, i) in list" :key="i">
            <td>{{ new Date(item.timestamp) | moment }}</td>
            <td>{{ item.open }}</td>
            <td>{{ item.high }}</td>
            <td>{{ item.low }}</td>
            <td>{{ item.close }}</td>
            <td>{{ item.volume }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "QuotesList",
  props: ["socket"],
  computed: {
    ...mapState(["symbol"]),
  },

  data: () => ({
    list: [],
    loading: true,
    currentSymbol: "",
  }),
  filters: {
    moment: function (date) {
      return moment(date).format("DD.MM.YYYY HH:mm:ss");
    },
  },
  created() {
    this.loading = true;
    this.$http
      .get(
        `/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${this.symbol}`
      )
      .then((res) => {
        this.list = res.data;
        this.loading = false;
      })
      .catch((e) => {
        this.loading = false;
        throw new Error(e);
      });
  },
  mounted() {
    this.currentSymbol = this.symbol;
    this.socket.addEventListener("message", (res) => {
      const { data, action } = res.data;
      if (data && action === "insert") {
        const newRows = [...data, ...this.list];
        this.list = newRows.splice(0, 99);
      }
    });
    const message = `{"op": "subscribe", "args": "tradeBin1m:${this.symbol}"}`;
    if (this.socket.readyState === WebSocket.OPEN) this.socket.send(message);
    else
      this.socket.addEventListener(
        "open",
        () => {
          this.socket.send(message);
        },
        { once: true }
      );
  },

  beforeDestroy() {
    if (this.socket.readyState === WebSocket.OPEN)
      this.socket.send(
        `{"op": "unsubscribe", "args": "tradeBin1m:${this.currentSymbol}"}`
      );
  },
};
</script>

<style lang="scss" scoped></style>
