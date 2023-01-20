<template>
    <b-row>
        <b-col>
            <b-form @submit="isModify ? onUpdate : onCreate" v-if="show">
                <b-form-group id="createDate" label="Date Created:" label-for="createDate" v-if="isModify">
                    <b-form-input
                        disabled
                        id="createDate"
                        v-model="form.createDate"
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="writer" label="Writer:" label-for="writer">
                    <b-form-input
                        disabled
                        id="writer"
                        v-model="form.writer"
                        v-if="isModify"
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="section" label="Section:" label-for="section">
                    <b-form-select
                        id="section"
                        v-model="form.section"
                        :options="sections"
                        required
                    ></b-form-select>
                </b-form-group>
                <b-form-group id="title" label="Title:" label-for="title">
                    <b-form-input
                        id="title"
                        v-model="form.title"
                        placeholder="제목을 입력해 주세요."
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                        id="radio-group-1"
                        v-model="contentType"
                        :options="contentOptions"
                        :aria-describedby="ariaDescribedby"
                        name="radio-options"
                    ></b-form-radio-group>
                </b-form-group>
                <b-form-group id="content" label="Content:" label-for="content" v-if="contentType === 1">
                    <b-form-textarea
                        id="content"
                        v-model="form.content"
                        placeholder="내용을 입력해 주세요."
                    ></b-form-textarea>
                </b-form-group>
                <VueEditor v-model="form.content" @image-added="handleImageAdded" v-if="contentType === 2"/>
                <b-button type="submit" variant="primary">{{ isModify ? '수정' : '확인' }}</b-button>
                <b-button v-if="isModify" variant="danger" @click="onDelete">삭제</b-button>
                <b-button v-if="isModify" @click="onList">목록</b-button>
            </b-form>
        </b-col>
    </b-row>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    name: "BoardForm",
    components: {VueEditor},
    data() {
        return {
            isModify: false,
            show: true,
            contentType: 2,
            contentOptions: [
                { text: 'Textarea', value: 1 },
                { text: 'Vue-Editor', value: 2 },
            ],
            form: {
                section: '',
                title: '',
                content: '',
                createDate: '',
                writer: '',
            },
            sections: [
                {text: 'Select', value: ''},
                {text: '일상', value: 1},
                {text: '궁금해요', value: 2},
                {text: '웃긴이야기', value: 3},
            ]
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const id = Number(this.$route.params.id || 0)
            if (id) {
                this.isModify = true
                this.getData()
            }

        },
        handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            let formData = new FormData();
            formData.append("image", file);

            // axios({
            //     url: "https://fakeapi.yoursite.com/images",
            //     method: "POST",
            //     data: formData
            // })
            //     .then(result => {
            //         const url = result.data.url; // Get url from response
            //         Editor.insertEmbed(cursorLocation, "image", url);
            //         resetUploader();
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        },
        async getData() {
            try {
                const url = ''
                // const response = await this.$axios.get(url)
                const response = {
                    result: true,
                    data: {
                        id: 1,
                        section: 1,
                        title: '타이틀입니다 어쩌고저쩌고',
                        content: '<h1>Some initial content</h1>',
                        createDate: '2023-01-19 14:50:11',
                        writer: '망망'
                    }
                }

                if (response.result) {
                    this.form = response.data
                }

                this.show = true

            } catch (e) {
                alert(e)
            }
        },
        async onCreate() {
            console.log('create')
            try {
                const url = ''
                const response = await this.$axios.post(url, this.form)

            } catch (e) {
                alert(e)
            }
        },
        async onDelete() {
            console.log('delete')
            try {
                const url = ''
                const response = await this.$axios.delete(url, this.form)

            } catch (e) {
                alert(e)
            }
        },
        async onUpdate() {
            console.log('update')
            try {
                const url = ''
                const response = await this.$axios.put(url, this.form)

            } catch (e) {
                alert(e)
            }
        },
        onList() {
            this.$router.push('/')
        },

    }
}
</script>

<style scoped>

</style>