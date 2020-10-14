<template>
<v-app id="inspire">
        <div>
  <b-tabs content-class="mt-3">
    <b-tab title="등록된 데이터 세트" active>
      <p>
          <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="members"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      item-key="members.index"
      class="elevation-1"
      @click:row="handleClick"
       @page-count="pageCount = $event"
    >
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
  </v-card>
      </p>
    </b-tab>
    <b-tab title="데이터 세트 모니터"><p>I'm the second tab</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>

</div>
</v-app>
</template>

<script>
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';

export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: '',
      selected: [],
      headers: [
        {
          text: '이름',
          align: 'left',
          value: 'name'
        },
        { text: '버전', sortable: false, value: 'version'},
        { text: 'Data source', sortable: false,  value: 'datasource' },
        { text: '만든 날짜', value: 'credate' },
        { text: '수정 날짜', value: 'upddate' },
        { text: '속성', sortable: false, value: 'type' },
        { text: '만든 사람', sortable: false, value: 'creuser' },
        { text: '태그', sortable: false, value: 'tag' }
      ]
    }
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
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'DATA SETS', route: 'alerts' }, { title: '데이터 세트' }]);
  },

  methods: {
  }
};
</script>
