<template>
    <div>
        <b-card>
            <b-row class="mt-3">
                <b-col cols="4">
                    <b-row>
                        <b-col cols="12">
                            <b-card>
                                <h4 class="text-center text-primary">Lấy ngẫu nhiên 1 số</h4>
                                <div v-if="itemRandom">
                                    <div>
                                        <p>Tên : <b>{{ itemRandom.ten }}</b></p>
                                        <p>Địa chỉ : <b>{{ itemRandom.diachi }}</b></p>
                                        <p>Căn Cước : <b>{{ itemRandom.cccd }}</b></p>
                                        <p><b-button @click="pickRandom" variant="primary">Random Lại</b-button></p>
                                    </div>
                                </div>
                            </b-card>
                        </b-col>
                        <b-col cols="12">
                            <b-card>
                                <b-overlay :show="overlay.form">

                                    <h4 class="text-center">Chế độ <b class="text-danger">{{ action }}</b> CCCD</h4>
                                    <b-form @submit.prevent="themCCCD" @reset="resetForm">
                                        <b-form-group label="Tên khách">
                                            <b-form-input style="text-transform: uppercase;" autocomplete="off"
                                                v-model="form.ten" type="search" placeholder="Nhập tên..."
                                                required></b-form-input>

                                        </b-form-group>

                                        <b-form-group label="Địa chỉ khách">
                                            <b-form-input style="text-transform: capitalize;" autocomplete="off"
                                                v-model="form.diachi" type="search" placeholder="Địa chỉ..."
                                                required></b-form-input>

                                        </b-form-group>
                                        <b-form-group label="Số CCCD">
                                            <b-form-input autocomplete="off" v-model="form.cccd" type="search"
                                                placeholder="Nhập CCCD..." required></b-form-input>
                                        </b-form-group>
                                        <b-button type="submit" variant="primary">{{ action }}</b-button>
                                        <b-button type="reset" variant="danger">Chuyển qua tạo mới CCCD</b-button>
                                    </b-form>
                                </b-overlay>
                            </b-card>
                        </b-col>

                    </b-row>

                </b-col>
                <b-col cols="8">
                    <b-table selectable responsive select-mode="single" selected-variant="success" class="text-center"
                        :fields="fieldsTable" :busy="overlay.table" small bordered hover show-empty :items="listcccd">

                        <template #table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Chờ xíu...</strong>
                            </div>
                        </template>
                        <template #cell(stt)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template #cell(tool)="data">
                            <b-button size="sm" variant="warning" @click="setItemEdit(data.item)">Chỉnh sửa</b-button>
                            <b-button size="sm" variant="danger" @click="deleteItem(data.item)">Xóa</b-button>
                        </template>
                    </b-table>
                </b-col>

            </b-row>

        </b-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                ten: null,
                diachi: null,
                cccd: null,
                id: null
            },
            action: 'Tạo mới',
            listcccd: [],
            overlay: {
                form: false,
                table: true
            },
            fieldsTable: [
                { key: 'stt', label: 'Stt' },
                { key: 'ten', label: 'Tên', sortable: true },
                { key: 'diachi', label: 'Địa chỉ', sortable: true },
                { key: 'cccd', label: 'Căn Cước', sortable: true },

                { key: 'tool', label: 'Tool' },
            ],
            itemRandom: null

        }
    },
    methods: {
        setItemEdit(item) {
            this.action = 'Chỉnh sửa';
            this.overlay.table = true
            this.overlay.form = true;
            this.itemEdit = item
            this.form.ten = item.ten
            this.form.diachi = item.diachi
            this.form.cccd = item.cccd
            this.form.id = item.id
            this.overlay.form = false;
            this.overlay.table = true
        },
        resetForm() {
            this.action = "Tạo mới"
            this.form = {
                ten: null,
                diachi: null,
                cccd: null,
                id: null
            }
            this.overlay.table = false;
       
        },
        themCCCD() {
            //kiểm tra, nếu trùng cccd thì là edit, còn không là tạo mới

            let isExist = this.listcccd.find(item => item.cccd === this.form.cccd)
            if (isExist) {
                console.log('chỉnh sửa')
                //chỉnh sửa
                this.overlay.table = true
                this.overlay.form = true;
                this.$supabase.from("cccd").update({
                    ten: String(this.form.ten).toUpperCase(),
                    diachi: String(this.form.diachi).toLocaleUpperCase(),
                    cccd: this.form.cccd
                }).eq('id', this.form.id).then(data => {
                    this.resetForm();
                    this.overlay.table = false
                    this.overlay.form = false;
                    this.getListCCCD().then(data => {
                        this.listcccd = data
                        this.overlay.table = false;
                        this.pickRandom();
                    })
                })
            } else {

                console.log('tạo mới')
                //tạo mới
                this.overlay.table = true
                this.overlay.form = true;
                this.$supabase.from("cccd").insert({
                    ten: String(this.form.ten).toUpperCase(),
                    cccd: this.form.cccd,
                    diachi: String(this.form.diachi).toLocaleUpperCase()
                }).then(data => {
                    console.log(data)
                    this.overlay.table = false
                    this.overlay.form = false;
                    this.resetForm();
                    this.getListCCCD().then(data => {
                        this.listcccd = data
                        this.overlay.table = false;
                        this.pickRandom();
                    })
                })
            }
            this.action = 'Tạo mới'
        },
        deleteItem(item) {

            let text = `Bạn xác nhận xóa với thông tin sau \n\n\n*Tên : ${item.ten}\n*CCCD : ${item.cccd} \n*Địa chỉ : ${item.diachi}`;
            if (confirm(text) == true) {
                this.$supabase.from('cccd').delete().eq('id', item.id).then(data => {
                    this.getListCCCD().then(data => {
                        this.listcccd = data
                        this.overlay.table = false;
                        this.pickRandom();
                    })
                })
            } else {
                text = "You canceled!";
            }
        },
        async getListCCCD() {
            this.overlay.table = true
            let result = await this.$supabase.from('cccd').select('')
            return result.data;
        },
        pickRandom() {
            this.itemRandom = this.listcccd[Math.floor(Math.random() * this.listcccd.length)];
        }
    },
    mounted() {
        this.getListCCCD().then(data => {
            this.listcccd = data
            this.overlay.table = false;
            this.pickRandom();
        })
    }
}
</script>