<template>
    <div>
        <b-card>
            <b-row>
                <b-col>
                    <b-form-group
                        label="Initial sort"
                        label-for="initial-sort-select"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        class="mb-0"
                    >
                        <b-form-select
                            id="initial-sort-select"
                            v-model="sortDirection"
                            :options="['asc', 'desc', 'last']"
                            size="sm"
                        ></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group
                        label="Per page"
                        label-for="per-page-select"
                        label-cols-sm="6"
                        label-cols-md="4"
                        label-cols-lg="3"
                        label-align-sm="right"
                        label-size="sm"
                        class="mb-0"
                    >
                        <b-form-select
                            id="per-page-select"
                            v-model="perPage"
                            :options="[10, 100, 1000]"
                            size="sm"
                        ></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-form-group
                        label-for="filter-input"
                    >
                        <b-input-group>
                            <b-form-input
                                id="filter-input"
                                v-model="filter"
                                type="search"
                                @keypress.enter="search"
                                placeholder="Search"
                            ></b-form-input>

                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-table :items="items" :busy="isBusy" class="mt-3" head-variant="dark" outlined hover>
                <template #cell(section)="data">
                    [{{ data.item.section | sectionString }}]
                </template>
                <template #cell(title)="data">
                    <router-link :to="`/form/${data.item.id}`">{{data.value }}</router-link>
                </template>
            </b-table>
            <b-row>
                <b-col>
                <b-pagination
                    v-model="currentPage"
                    :total-rows="total"
                    :per-page="10"
                    aria-controls="my-table"
                ></b-pagination>
                </b-col>
                <b-col>
                    <b-button @click="onCreate">등록</b-button>
                    <b-button variant="success" @click="onDownload">엑셀다운로드</b-button>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
export default {
    name: "BoardList",
    data() {
        return {
            isBusy: false,
            fields: [],
            items: [],
            currentPage: 1,
            total: 0,
            perPage: 10,
            filter: '',
            sortDirection: 'asc',
        }
    },
    filters: {
        sectionString(value) {
            return value === 1 ? '일상' : value === 2 ? '궁금해요' : '웃긴이야기'
        }
    },
    mounted() {
        this.init()
    },
    computed: {},
    methods: {
        async search() {
            try {
                //const response = await this.$axios.get('')
                const response = {
                    result: true,
                    data: {
                        total: 100,
                        list: [
                            {
                                id: 4,
                                section: 1,
                                title: '음?',
                                writer: 'Dickerson',
                                viewCount: 0,
                                createDate: new Date().toDateString()
                            },
                            {
                                id: 3,
                                section: 2,
                                title: '무제',
                                writer: 'Larsen',
                                viewCount: 1,
                                createDate: new Date().toDateString()
                            },
                            {
                                id: 2,
                                section: 3,
                                title: '2023년도 화이팅! 새해복 많이받으세여',
                                writer: 'Geneva',
                                viewCount: 0,
                                createDate: new Date().toDateString()
                            },
                            {
                                id: 1,
                                section: 1,
                                title: '첫 게시글이에요',
                                writer: 'Jami',
                                viewCount: 3,
                                createDate: new Date().toDateString()
                            },
                        ]
                    }
                }

                this.items = response.data.list
                this.total = response.data.total
            } catch (e) {

            }
        },
        init() {
            this.currentPage = 1
            this.sortDirection = 'desc'
            this.filter = ''
            this.search()
        },
        onCreate() {
            this.$router.push('/form/0')
        },
        onDownload() {

        }
    }
}
</script>

<style scoped>

</style>