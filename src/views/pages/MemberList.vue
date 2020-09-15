<template>
  <v-card>
    <v-card-title>
      검색
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="members"
      :search="search"
      :single-select="singleSelect"
      item-key="id"
      show-select
      class="elevation-1"
      @click:row="handleClick"
    >
    </v-data-table>
  </v-card>
</template>
<script>
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';

export default {
  data() {
    return {
      singleSelect: false,
      selected: [],
      search: '',
      headers: [
        {
          text: '아이디',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: '이름', value: 'name' },
        { text: '이메일', value: 'email' },
        { text: '기업명', value: 'company' },
        { text: '전화번호', value: 'tel' },
        { text: '등록일', value: 'credate' }
      ]
    };
  },

  computed: {
    members() {
      return this.$store.state.member.members;
    }
  },

  created() {
    this.$store.dispatch('memberlist');
  },

  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: '멤버 관리', route: '/member/list' }, { title: '멤버 리스트' }]);
  },
  methods: {
    handleClick() {
              this.$store.dispatch('memberdetail').then(
          () => {
            this.$router.push('/member/detail');
          },
          (error) => {
            alert(error.message);
          }
        );
    }
  }
};
</script>
