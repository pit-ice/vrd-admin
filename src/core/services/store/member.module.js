import ApiService from '@/core/services/api.service';

// action types

export const GET_MEMBER = 'getList';
export const SET_ERROR = 'setError';

const state = {
  member: []
};

const getters = {};

const actions = {
  memberlist(context) {
    ApiService.get('/member/list')
      .then(({ data }) => {
        context.commit('memberlist', data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  memberdetail(context) {
    ApiService.get('/member/detail')
      .then(({ data }) => {
        context.commit('memberdetail', data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const mutations = {
  setError(state, error) {
    state.errors = error;
  },
  memberlist(state, list) {
    state.member = list;
  },
  memberdetail(state, list) {
    state.member = list;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
