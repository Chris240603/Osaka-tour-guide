const { createApp } = Vue;

createApp({
    data() {
        return {
            isDarkMode: false,
            activeTab: 'itinerary',
            selectedDay: 1,
            expandedCards: [],
            days: [1, 2, 3, 4, 5],
            tabs: [
                { id: 'itinerary', name: '主要規劃行程', icon: 'fas fa-calendar-alt' },
                { id: 'attractions', name: '參考景點', icon: 'fas fa-camera' },
                { id: 'restaurants', name: '餐廳推薦', icon: 'fas fa-utensils' },
                { id: 'hotels', name: '飯店', icon: 'fas fa-bed' },
                { id: 'airlines', name: '航空', icon: 'fas fa-plane' },
                { id: 'links', name: '其他常用連結', icon: 'fas fa-link' }
            ],
            attractions: [],
            restaurants: [],
            hotels: [],
            airlines: [],
            linkSections: [
                {
                    id: 'transport',
                    title: '交通資訊',
                    icon: 'fas fa-train',
                    links: []
                },
                {
                    id: 'tickets',
                    title: '樂園、展覽門票',
                    icon: 'fas fa-ticket-alt',
                    links: []
                },
                {
                    id: 'tourism',
                    title: '旅遊部落格',
                    icon: 'fas fa-info-circle',
                    links: []
                }
            ],
            itinerary: {}
        }
    },
    mounted() {
        this.initAnimations();
        document.body.classList.add(this.isDarkMode ? 'dark-mode' : 'light-mode');
    },
    methods: {
        toggleMode() {
            this.isDarkMode = !this.isDarkMode;
            
            document.body.classList.remove('light-mode', 'dark-mode');
            document.body.classList.add(this.isDarkMode ? 'dark-mode' : 'light-mode');

            anime({
                targets: '.mode-toggle',
                rotate: '1turn',
                duration: 600,
                easing: 'easeInOutQuad'
            });
        },
        switchTab(tabId) {
            this.activeTab = tabId;
            this.expandedCards = [];
            
            this.$nextTick(() => {
                this.animateContent();
            });
        },
        switchDay(day) {
            this.selectedDay = day;
            this.expandedCards = [];
            
            this.$nextTick(() => {
                this.animateCards();
            });
        },
        toggleCard(cardId) {
            const index = this.expandedCards.indexOf(cardId);
            if (index > -1) {
                this.expandedCards.splice(index, 1);
            } else {
                this.expandedCards.push(cardId);
            }
            
            this.$nextTick(() => {
                const card = document.querySelector(`[data-card-id="${cardId}"]`);
                if (card) {
                    const content = card.querySelector('.card-content');
                    if (this.expandedCards.includes(cardId)) {
                        anime({
                            targets: content,
                            duration: 400,
                            easing: 'easeOutQuad'
                        });
                    }
                }
            });
        },
        getItineraryByDay(day) {
            return this.itinerary[day] || [];
        },
        initAnimations() {
            anime({
                targets: '.header',
                opacity: [0, 1],
                translateY: [-50, 0],
                duration: 800,
                easing: 'easeOutQuad'
            });

            anime({
                targets: '.nav-tabs',
                opacity: [0, 1],
                duration: 100,
                delay: 300,
                easing: 'easeOutQuad'
            });

            anime({
                targets: '.nav-tab',
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 150,
                delay: anime.stagger(100, { start: 500 }),
                easing: 'easeOutQuad'
            });

            setTimeout(() => {
                this.animateContent();
            }, 1000);
        },
        animateContent() {
            this.animateCards();
            this.animatePlaceItems();
            this.animateDayButtons();
            this.animateLinks();
        },
        animateCards() {
            const cards = document.querySelectorAll('.content-section.active .card');
            
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
            });
            
            anime({
                targets: cards,
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 100,
                delay: anime.stagger(150),
                easing: 'easeOutQuad'
            });
        },
        animatePlaceItems() {
            const items = document.querySelectorAll('.content-section.active .place-item');
            
            items.forEach(item => {
                item.style.opacity = '0';
            });
            
            anime({
                targets: items,
                opacity: [0, 1],
                duration: 150,
                delay: anime.stagger(100),
                easing: 'easeOutQuad'
            });
        },
        animateDayButtons() {
            const buttons = document.querySelectorAll('.day-selector .day-btn');
            
            buttons.forEach(button => {
                button.style.opacity = '0';
                button.style.transform = 'scale(0.8)';
            });
            
            anime({
                targets: buttons,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 500,
                delay: anime.stagger(80),
                easing: 'easeOutBack'
            });
        },
        animateLinks() {
            const links = document.querySelectorAll('.content-section.active .link-item');
            
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'scale(0.8)';
            });
            
            anime({
                targets: links,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 100,
                delay: anime.stagger(80),
                easing: 'easeOutBack'
            });
        }
    }
}).mount('#app');
