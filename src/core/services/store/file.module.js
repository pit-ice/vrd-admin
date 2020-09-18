import ApiService from '@/core/services/api.service';

const state = {
  progressRate: 0
};

const getters = {};

const actions = {
  upload(context, formdata) {
    ApiService.post('/sample/file', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function(progressEvent) {
        context.commit('SET_UPLOAD_PROGRESS', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)));
      }
    });
  },
  multfile(context, formdata) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(loaded, total, percent);
        context.commit('SET_UPLOAD_PROGRESS', parseInt(percent));
      }
    };

    ApiService.post('/sample/multfile', formdata, config).then(
      res => {
        console.log('111');
        console.log(res);
        this.setState({ avatar: res.status, percent: 100 }, () => {
          setTimeout(() => {
            this.setState({ progrespercentsRate: 0 });
          }, 1000);
        });
      },
      error => {
        alert(error.message);
      }
    );
  }
};

const mutations = {
  SET_UPLOAD_PROGRESS(state, progressRate) {
    console.log(progressRate);
    state.progressRate = progressRate;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
