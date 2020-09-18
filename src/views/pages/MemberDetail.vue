<template>
  <div>

        

        <KTCodePreview v-bind:title="'멤버 상세'">
          <template v-slot:preview >
           
            <v-card flat>
              <v-snackbar v-model="snackbar" absolute top right color="success">
                <span>Registration successful!</span>
                <v-icon dark>mdi-checkbox-marked-circle</v-icon>
              </v-snackbar>
              <v-form ref="form" @submit.prevent="submit">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="member.id"
                        color="purple darken-2"
                        label="아이디"
                        readonly
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="member.email"
                        :rules="rules.email"
                        color="blue darken-2"
                        label="이메일"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="member.name"
                        :rules="rules.required"
                        color="blue darken-2"
                        label="이름"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="member.tel"
                        :rules="rules.required"
                        color="blue darken-2"
                        label="전화번호"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="member.company"
                        :rules="rules.required"
                        color="blue darken-2"
                        label="기업명"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="member.nick"
                        color="blue darken-2"
                        label="Nick"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="member.credate"
                        color="blue darken-2"
                        label="가입일"
                        readonly
                        filled
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12">
                      <v-checkbox v-model="form.terms" color="green">
                        <template v-slot:label>
                          <div @click.stop="">
                            동의
                          </div>
                        </template>
                      </v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
                <v-card-actions>
                  <!-- <v-btn text @click="resetForm">취소</v-btn> -->
                  <v-spacer></v-spacer>
                  <v-btn :disabled="!formIsValid" text color="primary" type="submit">Register</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </template>
        </KTCodePreview>
  </div>
</template>

<script>
import KTCodePreview from '@/components/CodePreview.vue';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';

// code6
const defaultForm = Object.freeze({
  first: '',
  last: '',
  bio: '',
  favoriteAnimal: '',
  age: null,
  terms: false
});

export default {
  data() {
    return {
        form: Object.assign({}, defaultForm),
        rules: {
          email: [ v => !!v || 'E-mail is required',
                   v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
          required: [val => (val || '').length > 0 || 'This field is required']
        },
        snackbar: false,
        terms: false,
        defaultForm

    };
  },
  components: {
    KTCodePreview
  },
  mounted() {
     this.$store.dispatch(SET_BREADCRUMB, [{ title: '멤버 관리', route: '/member/list' }, { title: '멤버 상세' }]);
  },

  computed: {
    // code6
    formIsValid() {
      return this.member.email && this.member.name && this.member.tel && this.member.company && this.form.terms;
    },
    member() {
      return this.$store.state.member.member;
    }
  },
  created() {
    this.$store.dispatch('memberdetail');
  },
  methods: {
    // code6
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
            this.$store.dispatch('memberupdate').then(
        () => {
         alert('Update Success');
            this.snackbar = true;
        },
        error => {
          alert(error.message);
        }
      );

    }
  }
};
</script>
