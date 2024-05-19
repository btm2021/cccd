<template>
  <div v-if="info">
    <table style="width: 100%">
      <thead>
        <tr>
          <th colspan="4" class="text-right font-italic"></th>
          <th colspan="5" class="text-right font-italic text-center">
            Mẫu số: 01/TNDN
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4" class=""></td>
          <td colspan="5" class="text-center font-italic">
            (Ban hành kèm theo Thông tư số 78/2014/TT-BTC của Bộ Tài chính)
          </td>
        </tr>
        <tr>
          <td
            colspan="9"
            class="text-center font-weight-bold"
            style="font-size: 25px"
          >
            BẢNG KÊ THU MUA HÀNG HOÁ, DỊCH VỤ MUA VÀO KHÔNG CÓ HOÁ ĐƠN
          </td>
        </tr>
        <tr>
          <td colspan="9" class="text-center font-italic">
            (Từ ngày 01/01/2024 đến ngày 31/03/2024)
          </td>
        </tr>
        <tr>
          <td colspan="1" class="text-left">Tên cơ sở kinh doanh :</td>
          <td colspan="8" class="text-left font-weight-bold">
            {{ info.tencosokinhdoanh }}
          </td>
        </tr>
        <tr>
          <td colspan="1" class="text-left">Mã số thuế :</td>
          <td colspan="8" class="text-left font-weight-bold">
            {{ info.masothue }}
          </td>
        </tr>
        <tr>
          <td colspan="1" class="text-left">Địa chỉ :</td>
          <td colspan="8" class="text-left font-weight-bold">
            {{ info.diachi }}
          </td>
        </tr>
        <tr>
          <td colspan="1" class="text-left">Địa điểm nơi tổ chức thu mua:</td>
          <td colspan="8" class="text-left font-weight-bold">
            {{ info.diachi }}
          </td>
        </tr>
        <tr>
          <td colspan="1" class="text-left">Người phụ trách mua hàng:</td>
          <td colspan="8" class="text-left font-weight-bold">
            {{ info.giamdoc }}
          </td>
        </tr>
        <tr>
          <td colspan="9">&nbsp;</td>
        </tr>
        <tr class="t trBorder">
          <td class="t tdBorder" rowspan="2">Ngày tháng</td>
          <td class="t tdBorder" colspan="3">Người Bán</td>
          <td class="t tdBorder" colspan="4">Hàng Hóa Mua Vào</td>
          <td class="t tdBorder" rowspan="2">Ghi Chú</td>
        </tr>
        <tr class="t trBorder">
          <td class="t tdBorder">Tên người bán hàng</td>
          <td class="t tdBorder">Địa chỉ</td>
          <td class="t tdBorder">Số CCCD</td>
          <td class="t tdBorder">Tên mặt hàng</td>
          <td class="t tdBorder">Số lượng</td>
          <td class="t tdBorder">Đơn giá</td>
          <td class="t tdBorder">Tổng Thanh Toán</td>
        </tr>

        <tr class="t" v-for="(item, index) in info.listsanpham" :key="index">
          <td class="t tdBorder">{{ item.thoigian }}</td>
          <td class="t tdBorder">{{ item.tenkhach }}</td>
          <td class="t tdBorder">{{ item.diachi }}</td>
          <td class="t tdBorder">{{ item.cccd }}</td>
          <td class="t tdBorder">{{ item.loaivang }}</td>
          <td class="t tdBorder">{{ item.trongluong }} Chỉ</td>
          <td class="t tdBorder">{{ item.banggia }}</td>
          <td class="t tdBorder">{{ item.giatien }}</td>
          <td class="t tdBorder"></td>
        </tr>
        <tr class="t trBorder">
          <td class="t tdBorder"></td>
          <td class="t tdBorder">Tổng cộng</td>
          <td class="t tdBorder" colspan="3"></td>
          <td class="t tdBorder">155.9</td>
          <td class="t tdBorder"></td>
          <td class="t tdBorder">265.266.222</td>
          <td class="t tdBorder"></td>
        </tr>
        <tr class="">
          <td colspan="9" class="text-left font-weight-bold">
            Tổng giá trị hàng hoá mua vào:
          </td>
        </tr>
        <tr>
          <td colspan="5" class="text-center font-weight-bold">
            Người lập bảng kê
          </td>
          <td colspan="4" class="text-center font-weight-bold">
            Ngày 31 tháng 03 năm 2024
          </td>
        </tr>
        <tr>
          <td colspan="5" class="text-center font-italic">
            (Ký, ghi rõ họ tên)
          </td>
          <td colspan="4" class="text-center font-italic">(Ký Tên,Đóng Dấu)</td>
        </tr>
        <tr>
          <td colspan="5" class="text-center font-weight-bold">
            {{ info.giamdoc }}
          </td>
          <td colspan="4" class="text-center font-weight-bold">
            Giám đốc <br />{{ info.giamdoc }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startTime: null,
      endTime: null,
      info: null,
    };
  },
  mounted() {
    let localInfo = localStorage.getItem("info");
    this.info = JSON.parse(localInfo);
  },
  methods: {
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
  },
};
</script>
<style>
.t {
  border: 1px solid black;
  text-align: center;
  font-size: 13px;
  vertical-align: middle;
}

.trBorder {
  font-weight: bold;
  font-size: 18px;
}
</style>