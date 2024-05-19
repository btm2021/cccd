<template>
    <div>
        <b-card>
            <b-row>

                <b-col cols="4">
                    <b-calendar v-model="datepicker" locale="vi-VN"></b-calendar>
                    <div>
                        <b-button>Download</b-button>
                    </div>
                </b-col>

                <b-col cols="8">
                   <b-row>
                    <b-col cols="12">
                        <b-card>
                            Tạo Bảng Kê Mua Vào
                            
                        </b-card>
                    </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-card>

    </div>
</template>

<script>
export default {

    data() {
        return {
            datepicker: null
        }
    },
    methods: {

    }
}
</script>