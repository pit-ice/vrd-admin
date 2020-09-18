<template>
  <div class="card card-custom">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h2 class="card-title font-weight-bolder">
        데이터 세트 등록하기
      </h2>
    </div>
    <!--end::Header-->
    <div class="card-body p-0">
      <!--begin: Wizard-->
      <div class="wizard wizard-2" id="kt_wizard_v2" data-wizard-state="step-first" data-wizard-clickable="true">
        <!--begin: Wizard Nav -->
        <div class="wizard-nav border-right py-8 px-8 py-lg-20 px-lg-10">
          <div class="wizard-steps">
            <div class="wizard-step" data-wizard-type="step">
              <div class="wizard-wrapper">
                <div class="wizard-icon">
                  <span class="svg-icon svg-icon-2x">
                    <inline-svg src="/media/svg/icons/Files/Upload.svg" />
                  </span>
                </div>
                <div class="wizard-label">
                  <h3 class="wizard-title">
                    1. 데이터 파일 업로드
                  </h3>
                  <div class="wizard-desc">
                    등록할 데이터 파일 업로드
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end: Wizard Nav -->

        <!--begin: Wizard Body -->
        <KTCodePreview v-bind:title="'file upload'">
          <template v-slot:preview>
            <v-file-input
              v-model="files"
              color="deep-purple accent-4"
              counter
              label="File input"
              multiple
              placeholder="Select your files"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                  {{ text }}
                </v-chip>

                <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2"> +{{ files.length - 2 }} File(s) </span>
              </template>
            </v-file-input>
          </template>
        </KTCodePreview>
        
        <KTCodePreview v-bind:title="'Progress'">
          <template v-slot:preview>
            <div>
              {{progress}}
              <b-progress :value="progress" :max="100" show-progress animated></b-progress>
            </div>
          </template>
        </KTCodePreview>
      </div>
      
                  <div class="d-flex justify-content-between border-top pt-10">
                  <div class="mr-2">
                  </div>
                  <div>
                    <button v-on:click="submit" class="btn btn-success font-weight-bold text-uppercase px-9 py-4" data-wizard-type="action-submit">
                      Submit
                    </button>
                    
                  </div>
                </div>
      <!--end: Wizard-->
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/sass/pages/wizard/wizard-2.scss';
</style>

<script>
import KTCodePreview from '@/components/CodePreview.vue';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';

export default {
  data() {
    return {
        files: [],
        progressRate: 0,
      
    };
  },
  components: {
    KTCodePreview
  },
    methods: {
    submit: function() {
      
      let formData = new FormData();
     // formData.append('attcFileData1', this.files[0]);
      for(var i =0; i < this.files.length; i++){
          formData.append('attcFileData1', this.files[i]);
      }

      this.$store
        .dispatch('multfile', formData)

    },
  },

computed: {
    progress() {
      return this.$store.state.file.progressRate;
    },
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Multi Upload' }]);
  }
};
</script>
