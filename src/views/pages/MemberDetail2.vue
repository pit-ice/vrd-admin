<template>
<v-form
  ref="form"
  v-model="valid"
  lazy-validation
>
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
            :counter="12"
            :rules="rules"
            label="아이디"
            readonly
          ></v-text-field>

          <v-text-field
            v-model="member.email"
            :counter="20"
            :rules="rules"
            label="이메일"
            
          ></v-text-field>

          <v-text-field
            v-model="member.tel"
            :counter="20"
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
            :counter="6"
            :rules="rules"
            label="이름"
          ></v-text-field>
           <v-text-field
            v-model="member.company"
            :counter="20"
            :rules="rules"
            label="기업명"
          ></v-text-field>
           <v-text-field
            v-model="member.nick"
            :counter="20"
            :rules="rules"
            label="Nick"
          ></v-text-field>
      </v-col>
    </v-row>
    
          <v-text-field
            v-model="member.credate"
            label="가입일"
            readonly
          ></v-text-field>
     <v-checkbox
          v-model="allowSpaces"
          label="Allow spaces"
        ></v-checkbox>
  </v-container>
  <v-btn
    :disabled="!valid"
    color="success"
    class="mr-4"
    @click="validate"
  >
    Validate
  </v-btn>

  <v-btn
    color="error"
    class="mr-4"
    @click="reset"
  >
    Reset Form
  </v-btn>

  <v-btn
    color="warning"
    @click="resetValidation"
  >
    Reset Validation
  </v-btn>
</v-form>
</template>
<script>
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
export default {
  data: () => ({
      allowSpaces: false,
      valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
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
      validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    },
    mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: '멤버 관리', route: '/member/list' }, { title: '멤버 상세' }]);
  }
};
</script>
