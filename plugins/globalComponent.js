import Vue from 'vue';
import Spinner from '@/components/UI/Spinner.vue';
import SignInModal from '@/components/SignInModal.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowDown, faArrowUp);
Vue.component('spinner', Spinner);
Vue.component('sign-in-modal', SignInModal);
