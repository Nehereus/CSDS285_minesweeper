//imports
  import vue from 'vue';
  import vuetify from 'vuetify';
  import router from 'vue-router';
  import paths from './routing.config';
  import app from './app.vue';


  vue.use(router);
  vue.use(vuetify);
  vue.config.productionTip = false
  new vue({
    router: new router({routes: paths}),
    vuetify: new vuetify(),
    render: h => h(app)
  }).$mount('#app')
