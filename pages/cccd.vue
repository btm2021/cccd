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
                                        <p><b-button @click="pickRandom" variant="primary">
                                                <b-icon-shuffle></b-icon-shuffle> Random Lại</b-button></p>
                                    </div>
                                </div>
                                <p><b-button @click="downloadFile" variant="warning">
                                        <b-icon-arrow-down></b-icon-arrow-down> Tải file Excel</b-button></p>
                            </b-card>
                        </b-col>
                        <b-col cols="12">
                            <b-card v-if="action === 'Chỉnh sửa'">
                                <b-overlay :show="overlay.form">

                                    <h4 class="text-center">Chế độ <b class="text-danger">{{ action }}</b> CCCD</h4>
                                    <ValidationObserver ref="veeForm" v-slot="{ invalid }">
                                        <b-form @submit.prevent="chinhsuaCCCD" @reset="resetForm">

                                            <ValidationProvider rules="required"
                                                v-slot="{ errors, valid, failedRules }">
                                                <b-form-group label="Tên khách">
                                                    <b-form-input :state="valid" style="text-transform: uppercase;"
                                                        autocomplete="off" v-model="form.ten" type="search"
                                                        placeholder="Nhập tên..." required></b-form-input>
                                                    <b-form-invalid-feedback>
                                                        Tên :
                                                        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
                                                    </b-form-invalid-feedback>
                                                    <b-form-valid-feedback>

                                                        Tên : <b-icon-check-circle-fill></b-icon-check-circle-fill>
                                                    </b-form-valid-feedback>
                                                </b-form-group>
                                            </ValidationProvider>
                                            <ValidationProvider rules="required"
                                                v-slot="{ errors, valid, failedRules }">
                                                <b-form-group label="Địa chỉ khách">
                                                    <b-form-input :state="valid" style="text-transform: capitalize;"
                                                        autocomplete="off" v-model="form.diachi" type="search"
                                                        placeholder="Địa chỉ..." required></b-form-input>
                                                    <b-form-invalid-feedback>
                                                        Nhập Địa chỉ :
                                                        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
                                                    </b-form-invalid-feedback>
                                                    <b-form-valid-feedback>

                                                        Địa chỉ : <b-icon-check-circle-fill></b-icon-check-circle-fill>
                                                    </b-form-valid-feedback>
                                                </b-form-group>
                                            </ValidationProvider>
                                            <ValidationProvider rules="numeric|required|min:12|max:12"
                                                v-slot="{ errors, valid, failedRules }">
                                                <b-form-group label="Số CCCD">
                                                    <b-form-input :state="valid" autocomplete="off" v-model="form.cccd"
                                                        type="search" placeholder="Nhập CCCD..."
                                                        required></b-form-input>
                                                    <b-form-invalid-feedback>
                                                        CCCD :
                                                        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
                                                    </b-form-invalid-feedback>
                                                    <b-form-valid-feedback>
                                                        CCCD : <b-icon-check-circle-fill></b-icon-check-circle-fill>
                                                    </b-form-valid-feedback>
                                                </b-form-group>
                                            </ValidationProvider>
                                            <b-button type="submit" variant="primary">{{ action }}</b-button>
                                            <b-button type="reset" variant="danger">Chuyển qua tạo mới CCCD</b-button>
                                        </b-form>
                                    </ValidationObserver>
                                </b-overlay>
                            </b-card>
                            <b-card v-if="action === 'Thêm Mới'">
                                <b-overlay :show="overlay.form">

                                    <h4 class="text-center">Chế độ <b class="text-danger">{{ action }}</b> CCCD</h4>
                                    <ValidationObserver ref="veeForm" v-slot="{ invalid }">
                                        <b-form @submit.prevent="themCCCD" @reset="resetForm">

                                            <ValidationProvider rules="required"
                                                v-slot="{ errors, valid, failedRules }">
                                                <b-form-group label="Tên khách">
                                                    <b-form-input :state="valid" style="text-transform: uppercase;"
                                                        autocomplete="off" v-model="form.ten" type="search"
                                                        placeholder="Nhập tên..." required></b-form-input>
                                                    <b-form-invalid-feedback>
                                                        Tên :
                                                        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
                                                    </b-form-invalid-feedback>
                                                    <b-form-valid-feedback>

                                                        Tên : <b-icon-check-circle-fill></b-icon-check-circle-fill>
                                                    </b-form-valid-feedback>
                                                </b-form-group>
                                            </ValidationProvider>
                                            <ValidationProvider rules="required"
                                                v-slot="{ errors, valid, failedRules }">
                                                <b-form-group label="Địa chỉ khách">
                                                    <b-form-input :state="valid" style="text-transform: capitalize;"
                                                        autocomplete="off" v-model="form.diachi" type="search"
                                                        placeholder="Địa chỉ..." required></b-form-input>
                                                    <b-form-invalid-feedback>
                                                        Nhập Địa chỉ :
                                                        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
                                                    </b-form-invalid-feedback>
                                                    <b-form-valid-feedback>

                                                        Địa chỉ : <b-icon-check-circle-fill></b-icon-check-circle-fill>
                                                    </b-form-valid-feedback>
                                                </b-form-group>
                                            </ValidationProvider>
                                            <ValidationProvider rules="numeric|required|min:12|max:12"
                                                v-slot="{ errors, valid, failedRules }">
                                                <b-form-group label="Số CCCD">
                                                    <b-form-input :state="valid" autocomplete="off" v-model="form.cccd"
                                                        type="search" placeholder="Nhập CCCD..."
                                                        required></b-form-input>
                                                    <b-form-invalid-feedback>
                                                        CCCD :
                                                        <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
                                                    </b-form-invalid-feedback>
                                                    <b-form-valid-feedback>
                                                        CCCD : <b-icon-check-circle-fill></b-icon-check-circle-fill>
                                                    </b-form-valid-feedback>
                                                </b-form-group>
                                            </ValidationProvider>
                                            <b-button type="submit" variant="primary">{{ action }}</b-button>
                                            <b-button type="reset" variant="danger">Chuyển qua tạo mới CCCD</b-button>
                                        </b-form>
                                    </ValidationObserver>
                                </b-overlay>
                            </b-card>
                        </b-col>

                    </b-row>

                </b-col>
                <b-col cols="8">
                    <b-input v-model="filter" type="search"
                        class="px-5 mb-2 text-center text-danger text-uppercase font-weight-bold" size="lg"
                        autocapitalize autocomplete="off" placeholder="Gõ gì cũng tược..."></b-input>
                    <b-table :filter="filter" selectable responsive select-mode="single" sort-by="id" sort-desc
                        selected-variant="success" class="text-center" :fields="fieldsTable" :busy="overlay.table" small
                        bordered hover show-empty :items="listcccd">

                        <template #table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Chờ xíu...</strong>
                            </div>
                        </template>
                        <template #cell(stt)="data">
                            {{ data.index + 1 }}
                        </template>
                        <template #cell(diachi)="data">
                            <b-badge variant="primary">

                                <span class="text-uppercase">{{ data.value }}</span>
                            </b-badge>
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
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { extend, configure } from "vee-validate";

import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach((rule) => {
    //console.log(rule);
    extend(rule, rules[rule]);
});

export default {
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            filter: null,
            form: {
                ten: null,
                diachi: null,
                cccd: null,
                id: null
            },
            action: 'Thêm Mới',
            listcccd: [],
            overlay: {
                form: false,
                table: true
            },
            fieldsTable: [
                { key: 'id', label: 'Stt', sortable: true },
                { key: 'ten', label: 'Tên', sortable: true },
                { key: 'diachi', label: 'Địa chỉ', sortable: true },
                { key: 'cccd', label: 'Căn Cước', sortable: true },

                { key: 'tool', label: 'Tool' },
            ],
            itemRandom: null

        }
    },
    methods: {
        downloadFile() {
            let str = `TÊN KHÁCH,ĐỊA CHỈ,CCCD\n`
            this.listcccd.map((item, index) => {
                str += `${String(item.ten).trim().replace(',', ' ')},${String(item.diachi).trim().toUpperCase().replace(',', ' ')},${String(item.cccd).trim()}`
                if (index === this.listcccd.length - 1) {

                } else {
                    str += '\n'
                }
            })
            let bom = "\uFEFF";
            console.log(str)
            let blob = new Blob([bom + str], { type: 'text/csv;charset=utf-8;' });
            let url = URL.createObjectURL(blob);

            let a = document.createElement('a');
            a.href = url;
            a.download = 'cccd.csv';

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);

            // Giải phóng URL tạm thời
            URL.revokeObjectURL(url);
        },
        setItemEdit(item) {
            this.action = 'Chỉnh sửa';
            this.itemEdit = item
            this.form.ten = item.ten
            this.form.diachi = item.diachi
            this.form.cccd = item.cccd
            this.form.id = item.id
        },
        resetForm() {
            this.action = "Thêm Mới"
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

        },
        chinhsuaCCCD() {

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