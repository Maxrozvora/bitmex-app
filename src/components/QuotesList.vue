<template>
  <div>
    <h2>Список котировок</h2>
    <div class="text-center mt-5" v-if="!list.length">
      <div
        class="spinner-border"
        role="status"
        style="width: 4rem; height: 4rem"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <table class="table" v-else>
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
      <tbody>
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
</template>

<script>
import config from "@/config";
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "QuotesList",
  computed: {
    ...mapState(["symbol"]),
  },

  data: () => ({
    list: [],
    socket: new WebSocket(config.socketUrl),
  }),
  filters: {
    moment: function (date) {
      return moment(date).format("DD.MM.YYYY HH:mm:ss");
    },
  },
  created() {
    this.$http
      .get(
        `/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${this.symbol}`
      )
      .then((res) => {
        this.list = res.data;
      })
      .catch((e) => {
        throw new Error(e);
      });
  },
  mounted() {
    this.socket.addEventListener("message", (res) => {
      const { data, action } = res.data;
      if (data && action === "insert") {
        const newRows = [...data, ...this.list];
        this.list = newRows.splice(0, 99);
      }
    });

    this.socket.addEventListener("open", () => {
      this.socket.send(
        `{"op": "subscribe", "args": "tradeBin1m:${this.symbol}"}`
      );
    });
  },

  beforeDestroy() {
    this.socket.send(
      `{"op": "unsubscribe", "args": "tradeBin1m:${this.symbol}"}`
    );
  },
};
</script>

<style lang="scss" scoped>
</style>