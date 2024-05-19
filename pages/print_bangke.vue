<template>
  <div v-if="info">
    <table style="width: 100%">
      <thead>
        <tr>
          <th colspan="3" class="text-right font-italic"></th>
          <th colspan="6" class="text-right font-italic text-center">
            Mẫu số: 01/TNDN
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="3" class=""></td>
          <td colspan="6" class="text-center font-italic">
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
            (Từ ngày {{ info.ngaybatdau }} đến ngày {{ info.ngayketthuc }})
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
          <td class="t tdBorder">{{ formatN(item.giatien) }}</td>
          <td class="t tdBorder"></td>
        </tr>
        <tr class="t trBorder">
          <td class="t tdBorder"></td>
          <td class="t tdBorder">Tổng cộng</td>
          <td class="t tdBorder" colspan="3"></td>
          <td class="t tdBorder">{{ info.tongtrongluong }} Chỉ</td>
          <td class="t tdBorder"></td>
          <td class="t tdBorder">{{ formatN(info.tongsotien) }}</td>
          <td class="t tdBorder">VND</td>
        </tr>
        <tr class="">
          <td colspan="9">
            <span class="text-left font-weight-bold">
              Tổng giá trị hàng hoá mua vào:</span
            >
            {{ doctien(info.tongsotien) }}
          </td>
        </tr>
        <tr>
          <td colspan="5" class="text-center font-weight-bold">
            Người lập bảng kê
          </td>
          <td colspan="4" class="text-center font-weight-bold">
            {{
              $moment(info.ngayketthuc, "DD/MM/YYYY").format(
                "[Ngày] DD [Tháng] MM [Năm] YYYY"
              )
            }}
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
var DocTienBangChu = function () {
  this.ChuSo = new Array(
    " không ",
    " một ",
    " hai ",
    " ba ",
    " bốn ",
    " năm ",
    " sáu ",
    " bảy ",
    " tám ",
    " chín "
  );
  this.Tien = new Array(
    "",
    " nghìn",
    " triệu",
    " tỷ",
    " nghìn tỷ",
    " triệu tỷ"
  );
};

DocTienBangChu.prototype.docSo3ChuSo = function (baso) {
  var tram;
  var chuc;
  var donvi;
  var KetQua = "";
  tram = parseInt(baso / 100);
  chuc = parseInt((baso % 100) / 10);
  donvi = baso % 10;
  if (tram == 0 && chuc == 0 && donvi == 0) return "";
  if (tram != 0) {
    KetQua += this.ChuSo[tram] + " trăm ";
    if (chuc == 0 && donvi != 0) KetQua += " linh ";
  }
  if (chuc != 0 && chuc != 1) {
    KetQua += this.ChuSo[chuc] + " mươi";
    if (chuc == 0 && donvi != 0) KetQua = KetQua + " linh ";
  }
  if (chuc == 1) KetQua += " mười ";
  switch (donvi) {
    case 1:
      if (chuc != 0 && chuc != 1) {
        KetQua += " mốt ";
      } else {
        KetQua += this.ChuSo[donvi];
      }
      break;
    case 5:
      if (chuc == 0) {
        KetQua += this.ChuSo[donvi];
      } else {
        KetQua += " lăm ";
      }
      break;
    default:
      if (donvi != 0) {
        KetQua += this.ChuSo[donvi];
      }
      break;
  }
  return KetQua;
};

DocTienBangChu.prototype.doc = function (SoTien) {
  var lan = 0;
  var i = 0;
  var so = 0;
  var KetQua = "";
  var tmp = "";
  var soAm = false;
  var ViTri = new Array();
  if (SoTien < 0) soAm = true; //return "Số tiền âm !";
  if (SoTien == 0) return "Không đồng"; //"Không đồng !";
  if (SoTien > 0) {
    so = SoTien;
  } else {
    so = -SoTien;
  }
  if (SoTien > 8999999999999999) {
    //SoTien = 0;
    return ""; //"Số quá lớn!";
  }
  ViTri[5] = Math.floor(so / 1000000000000000);
  if (isNaN(ViTri[5])) ViTri[5] = "0";
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000);
  if (isNaN(ViTri[4])) ViTri[4] = "0";
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000);
  if (isNaN(ViTri[3])) ViTri[3] = "0";
  so = so - parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt(so / 1000000);
  if (isNaN(ViTri[2])) ViTri[2] = "0";
  ViTri[1] = parseInt((so % 1000000) / 1000);
  if (isNaN(ViTri[1])) ViTri[1] = "0";
  ViTri[0] = parseInt(so % 1000);
  if (isNaN(ViTri[0])) ViTri[0] = "0";
  if (ViTri[5] > 0) {
    lan = 5;
  } else if (ViTri[4] > 0) {
    lan = 4;
  } else if (ViTri[3] > 0) {
    lan = 3;
  } else if (ViTri[2] > 0) {
    lan = 2;
  } else if (ViTri[1] > 0) {
    lan = 1;
  } else {
    lan = 0;
  }
  for (i = lan; i >= 0; i--) {
    tmp = this.docSo3ChuSo(ViTri[i]);
    KetQua += tmp;
    if (ViTri[i] > 0) KetQua += this.Tien[i];
    if (i > 0 && tmp.length > 0) KetQua += ""; //',';//&& (!string.IsNullOrEmpty(tmp))
  }
  if (KetQua.substring(KetQua.length - 1) == ",") {
    KetQua = KetQua.substring(0, KetQua.length - 1);
  }
  KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
  if (soAm) {
    return "Âm " + KetQua + " đồng"; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  } else {
    return KetQua + " đồng"; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  }
};
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
    let info = JSON.parse(localInfo);
    console.log(info);

    info.tongtrongluong = parseInt(
      info.listsanpham.reduce((acc, current) => acc + current.trongluong, 0)
    );
    info.tongsotien = parseInt(
      info.listsanpham.reduce(
        (acc, current) => acc + parseInt(current.giatien),
        0
      )
    );

    this.info = info;
  },
  methods: {
    doctien(x) {
      var docTien = new DocTienBangChu();
      return docTien.doc(x); // return: "Hai  mươi nghìn đồng"
    },
    formatN(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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