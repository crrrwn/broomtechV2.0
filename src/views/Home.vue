<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
            <router-link to="/admin/login" class="text-sm font-medium text-gray-600 hover:text-gray-900">
            </router-link>
          </div>

          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Your reliable</span>
                <span class="block text-primary-600 xl:inline"> delivery partner</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                BroomTech offers a wide range of delivery services to meet your needs. From food delivery to package pickup and drop-off, we've got you covered.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link to="/register" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
                    Get started
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link to="/login" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10">
                    Sign in
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Delivery service">
      </div>
    </div>

    <!-- Services Section -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Services</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need, delivered
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We offer a wide range of delivery services to meet your needs.
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div v-for="(service, index) in services" :key="index" class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div class="ml-16">
                <h3 class="text-lg leading-6 font-medium text-gray-900">{{ service.title }}</h3>
                <p class="mt-2 text-base text-gray-500">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary-700">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Ready to get started?</span>
          <span class="block">Create an account today.</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-primary-200">
          Join thousands of satisfied customers who use BroomTech for their delivery needs.
        </p>
        <router-link to="/register" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto">
          Sign up for free
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
  {
    title: 'FOOD DELIVERY',
    description: 'Get your favorite food delivered to your doorstep from any restaurant or fast food chain.'
  },
  {
    title: 'PABILI SERVICE',
    description: 'Need something from the store? We can buy it for you and deliver it to your location.'
  },
  {
    title: 'PAY BILLS',
    description: 'Save time by having someone pay your bills for you. We can handle utility bills, credit card payments, and more.'
  },
  {
    title: 'PAPICKUP & DROP (PARCELS/ITEMS)',
    description: 'Need to send something to someone? We can pick it up and deliver it to the recipient.'
  },
  {
    title: 'SURPRISE / GIFTS DELIVERY',
    description: 'Send gifts and surprises to your loved ones. We ensure they arrive safely and on time.'
  },
  {
    title: 'REMITTANCES/PADALA MONEY',
    description: 'Send money to your loved ones through our secure remittance service.'
  },
  {
    title: 'GROCERIES / SHOPPING',
    description: 'Let us do your grocery shopping for you. Just provide your list and we\'ll deliver everything to your door.'
  },
  {
    title: 'MEDICINES/DRUGSTORE',
    description: 'Need medicine but can\'t leave home? We can pick up your prescriptions and deliver them to you.'
  }
]);
</script>

