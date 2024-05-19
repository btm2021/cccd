<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="12">
          <h1 class="mb-2 mt-3 text-center pb-5">Tạo mới bảng kê mua vào</h1>
        </b-col>
        <b-col cols="12">
          <b-row>
            <b-col cols="6">
              <b-form-group label="Ngày bắt đầu">
                <b-input v-model="ngaybatdau" autocomplete="off"></b-input>
              </b-form-group>
              <b-form-group label="Ngày kết thúc">
                <b-input v-model="ngayketthuc" autocomplete="off"></b-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Số lượng sản phẩm muốn tạo">
                <b-input v-model="count" autocomplete="off"></b-input>
              </b-form-group>

              <b-form-group label="Tỷ lệ 18K/24k">
                <b-input v-model="percent" autocomplete="off"></b-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Tên Cơ Sở Kinh Doanh">
                <b-input
                  v-model="info.tencosokinhdoanh"
                  autocomplete="off"
                ></b-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Mã số Thuế">
                <b-input v-model="info.masothue" autocomplete="off"></b-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Địa chỉ">
                <b-input v-model="info.diachi" autocomplete="off"></b-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Giám đốc">
                <b-input v-model="info.giamdoc" autocomplete="off"></b-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form>
            <b-button block variant="primary" @click="taodulieu"
              >Tạo mới</b-button
            >

            <a :href="strURL" v-if="strURL">
              <b-icon-arrow-down></b-icon-arrow-down> In Bảng Kê
            </a>
          </b-form>
          <b-table show-empty :items="info.listsanpham"></b-table>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        tencosokinhdoanh: "DNTN KD vàng bạc trang sức Bảo Phương",
        masothue: "41241213412",
        diachi:
          "Số 118 Huỳnh Phước, Khu phố 4, TT Phước Dân, Ninh Phước, Ninh Thuận",
        giamdoc: "Trịnh Minh Thơm",
        listsanpham: [],
      },
      catSanPham: ["NHẪN", "DÂY", "CÒNG", "LẮC", "BÔNG", "MẶT", "KIỀNG"],
      strURL: null,
      ngaybatdau: "1/1/2024",
      ngayketthuc: "1/5/2024",
      count: 250,
      percent: "20/1",
    };
  },
  methods: {
    async fetchHistoryXau(dateStart, dateEnd) {
      return new Promise((resolve, reject) => {
        console.log(dateStart, dateEnd);
        try {
          let url = `https://api.polygon.io/v2/aggs/ticker/C:XAUUSD/range/1/day/${dateStart}/${dateEnd}?apiKey=qfqtaJkX97eROQGYgU2fPaKvzH7_o9Yw`;
          fetch(url)
            .then((data) => data.json())
            .then((data) => {
              let d = data.results.map((i) => {
                let p18k =
                  parseInt(
                    (((parseFloat(i.c) + 1) * 1.20565 * 1.05 * 26000 + 400000) *
                      68) /
                      10000000
                  ) * 10;

                let p24k =
                  parseInt(
                    (((parseFloat(i.c) + 1) * 1.20565 * 1.05 * 26000 + 400000) *
                      100) /
                      10000000
                  ) * 10;

                return {
                  time: i.t,
                  price: parseInt(
                    (parseFloat(i.c) + 1) * 1.20565 * 1.05 * 26000 + 400000
                  ),
                  p18k,
                  p24k,
                };
              });
              resolve(d);
            });
        } catch (err) {
          reject(err);
        }
      });
    },
    b64EncodeUnicode(str) {
      return btoa(
        encodeURIComponent(str).replace(
          /%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
            return String.fromCharCode("0x" + p1);
          }
        )
      );
    },
    b64DecodeUnicode(str) {
      // Going backwards: from bytestream, to percent-encoding, to original string.
      return decodeURIComponent(
        atob(str)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    },
    findPriceForDate(dateStr, type, listBanggia) {
      //thụt lại 1 ngày
      const dateTimestamp = this.$moment(dateStr, "DD/MM/YYYY")
        .startOf("day")
        .valueOf();
      let priceEntry = listBanggia.find(
        (entry) =>
          this.$moment(entry.time).startOf("day").valueOf() === dateTimestamp
      );

      if (priceEntry) {
        return type === "18k" ? priceEntry.p18k : priceEntry.p24k;
      } else {
        console.log(dateStr);
        return type === "18k"
          ? listBanggia[listBanggia.length - 5].p18k
          : listBanggia[listBanggia.length - 5].p24k;
      }
    },
    formatN(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async taodulieu() {
      const timeStart = this.ngaybatdau;
      const timeEnd = this.ngayketthuc;
      const strStart = this.$moment(timeStart, "DDMM/YYYY").format(
        "YYYY-MM-DD"
      );
      const strEnd = this.$moment(timeEnd, "DD/MM/YYYY").format("YYYY-MM-DD");
      //taomoidanhsach
      let tbCCCD = await this.$supabase.from("cccd").select();
      let listBanggia = await this.fetchHistoryXau(strStart, strEnd);

      let listCCCD = tbCCCD.data;

      const maxItem = this.count;

      const generatedData = this.generateRandomData(
        listCCCD,
        timeStart,
        timeEnd,
        maxItem,
        listBanggia
      );
      let listsanpham = generatedData.map((i) => {
        return {
          tenkhach: i.tenkhach,
          diachi: i.diachi,
          cccd: i.cccd_num,
          giatien: i.giatien,
          trongluong: i.tlv,
          banggia: i.banggia,
          loaivang: `${i.tensanpham} Vàng${i.type}`,
          thoigian: i.time,
        };
      });
      this.info.listsanpham = listsanpham;
      localStorage.setItem("info", JSON.stringify(this.info));
      this.strURL = "/print_bangke";
    },

    randomDate(start, end) {
      const diff = end.diff(start, "days");
      const randomDiff = Math.floor(Math.random() * (diff + 1));
      return this.$moment(start).add(randomDiff, "days").format("DD/MM/YYYY");
    },

    // Hàm tạo ngẫu nhiên thời gian trong khoảng từ 8AM đến 6PM
    randomTime() {
      const hour = Math.floor(Math.random() * (18 - 8)) + 8;
      const minute = Math.floor(Math.random() * 60);
      const amPm = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${formattedHour}:${minute < 10 ? "0" + minute : minute} ${amPm}`;
    },
    generateRandomData(cccdList, timeStart, timeEnd, maxItem, listBanggia) {
      // Tạo số lượng item ngẫu nhiên từ maxItem +-5%
      const variation = Math.floor(maxItem * 0.05);
      const numItems =
        Math.floor(Math.random() * (2 * variation + 1)) + (maxItem - variation);

      const startDate = this.$moment(timeStart, "DD/MM/YYYY");
      const endDate = this.$moment(timeEnd, "DD/MM/YYYY");

      const data = [];
      console.log(listBanggia);
      for (let i = 0; i < numItems; i++) {
        const randomCccd =
          cccdList[Math.floor(Math.random() * cccdList.length)];
        const randomTlv = (Math.random() * (5 - 0.1) + 0.1).toFixed(1);
        const randomType = Math.random() > 0.95 ? "24K" : "18k";
        if (randomType === "24K") {
        }
        const randomDateStr = this.randomDate(startDate, endDate);
        const randomTimeStr = this.randomTime();
        const price = this.findPriceForDate(
          randomDateStr,
          randomType,
          listBanggia
        );

        data.push({
          tensanpham:
            this.catSanPham[Math.floor(Math.random() * this.catSanPham.length)],
          time: `${randomDateStr} ${randomTimeStr}`,
          cccd: randomCccd,

          type: randomType,
          tlv: parseFloat(randomTlv),
          giatien: this.formatN(parseInt(parseFloat(randomTlv) * price * 1000)),
          banggia: price,
          tenkhach: String(randomCccd.ten).toUpperCase(),
          diachi: String(randomCccd.diachi).toUpperCase(),
          cccd_num: randomCccd.cccd,
        });
      }
      data.sort(
        (a, b) =>
          this.$moment(a.time, "DD/MM/YYYY hh:mm A") -
          this.$moment(b.time, "DD/MM/YYYY hh:mm A")
      );

      return data;
    },
  },
};
</script>

