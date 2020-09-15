<template>
  <v-container>
    <v-row

      justify="space-between"
    >
      <v-col
        cols="3"
        md="5"
      >
        <v-form ref="form">
          <v-text-field
            v-model="member.id"
            :counter="max"
            :rules="rules"
            label="아이디"
            readonly
          ></v-text-field>

          <v-text-field
            v-model="member.email"
            :counter="max"
            :rules="rules"
            label="이메일"
            
          ></v-text-field>

          <v-text-field
            v-model="member.tel"
            :counter="max"
            :rules="rules"
            label="전화번호"
          ></v-text-field>

        </v-form>
      </v-col>

      <v-col
        cols="3"
        md="5"
      >
        <v-text-field
            v-model="member.name"
            :counter="max"
            :rules="rules"
            label="이름"
          ></v-text-field>
           <v-text-field
            v-model="member.company"
            :counter="max"
            :rules="rules"
            label="기업명"
          ></v-text-field>
           <v-text-field
            v-model="member.nick"
            :counter="max"
            :rules="rules"
            label="Nick"
          ></v-text-field>
      </v-col>
    </v-row>
    
          <v-text-field
            v-model="member.credate"
            :counter="max"
            :rules="rules"
            label="가입일"
            readonly
          ></v-text-field>
     <v-checkbox
          v-model="allowSpaces"
          label="Allow spaces"
        ></v-checkbox>
  </v-container>
</template>
<script>
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
export default {
  data: () => ({
      allowSpaces: false
    }),
   computed: {
      rules () {
        const rules = []

        if (this.max) {
          const rule =
            v => (v || '').length <= this.max ||
              `A maximum of ${this.max} characters is allowed`

          rules.push(rule)
        }

        if (!this.allowSpaces) {
          const rule =
            v => (v || '').indexOf(' ') < 0 ||
              'No spaces are allowed'

          rules.push(rule)
        }

        if (this.match) {
          const rule =
            v => (!!v && v) === this.match ||
              'Values do not match'

          rules.push(rule)
        }

        return rules
      },
      member() {
      return this.$store.state.member.member;
    }
    },
  created() {
    this.$store.dispatch('memberdetail');
  },
    watch: {
      match: 'validateField',
      max: 'validateField',
      model: 'validateField',
    },

    methods: {
      validateField () {
        this.$refs.form.validate()
      },
    },
    mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: '멤버 관리', route: '/member/list' }, { title: '멤버 상세' }]);
  }
};
</script>
