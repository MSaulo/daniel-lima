var router = new VueRouter({
  mode: 'history',
  routes: []
});

var app = new Vue({
  router,
  el: '#app',
  data: {
    link: undefined,
    monthName: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    news: undefined,
    notFound: false
  },

  async mounted() {
    this.link = this.$route.query.name;
    await this.fetchNews();
  },

  methods: {
    fetchNews: async function () {
      try {
        const news = await fetch(`http://api.daniellimarp.com.br/news/${this.link}`);
        this.news = await news.json();
        this.news.body = this.news.body.replace('\n', '<br>');
      } catch(ex) {
        this.notFound = true;
      }

      setTimeout(function() {
        // Portfolio details carousel
        $(".portfolio-details-carousel").owlCarousel({
          autoplay: true,
          dots: true,
          loop: true,
          items: 1
        });
      }, 10);
    }
  }

})