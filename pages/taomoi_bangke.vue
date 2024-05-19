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
                                <b-input v-model="info.tencosokinhdoanh" autocomplete="off"></b-input>
                            </b-form-group>

                        </b-col>
                        <b-col cols="6">
                            <b-form-group label="Mã số Thuế">
                                <b-input v-model="info.masothue" autocomplete="off"></b-input>
                            </b-form-group>

                        </b-col> <b-col cols="6">
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

                        <a :href="strURL">{{ strURL }}String</a>
                        <b-button block variant="primary" @click="taodulieu">Tạo mới</b-button>
                    </b-form>
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
                masothue: '41241213412',
                diachi: "Số 118 Huỳnh Phước, Khu phố 4, TT Phước Dân, Ninh Phước, Ninh Thuận",
                giamdoc: "Trịnh Minh Thơm",
                listsanpham: [

                ]
            },
            strURL: null,
            ngaybatdau: "1/1/2024",
            ngayketthuc: "1/5/2024",
            count: 250,
            percent: "20/1"
        }
    },
    methods: {
        b64EncodeUnicode(str) {

            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
        },
        b64DecodeUnicode(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        },
        taodulieu() {
            let a = this.b64EncodeUnicode(JSON.stringify(this.info))
            console.log(a)
            let b = this.b64DecodeUnicode(a)
            console.log(b)
            this.strURL = '/print_bangke?t=' + a

        }
    }
}
</script>