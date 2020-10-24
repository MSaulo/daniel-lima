var router = new VueRouter({
  mode: 'history',
  routes: []
});

var app = new Vue({
  router,
  el: '#app',
  data: {
    monthName: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    newsSubjects: {
      'educação': 'filter-education',
      'infraestrutura': 'filter-infrastructure',
      'projetos': 'filter-projects'
    },
    news: []
  },

  async mounted() {
    await this.fetchNews()
  },

  methods: {
    fetchNews: async function () {
      const news = await fetch(`http://api.daniellimarp.com.br/news`)
      this.news = await news.json()

      setTimeout(function() {
        // Porfolio isotope and filter
        var portfolioIsotope = $('.portfolio-container').isotope({
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function() {
          $("#portfolio-flters li").removeClass('filter-active');
          $(this).addClass('filter-active');

          portfolioIsotope.isotope({
            filter: $(this).data('filter')
          });
          aos_init();
        });
      }, 10)
      
    }
  }

})