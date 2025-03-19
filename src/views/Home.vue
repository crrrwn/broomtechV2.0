<template>
  <div class="font-sans antialiased">
    <!-- Hero Section with Video -->
    <div class="relative overflow-hidden bg-gradient-to-r from-green-900 to-green-800">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-green-800 transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
            <router-link to="/admin/login" class="text-sm font-medium text-green-200 hover:text-white transition-colors duration-300">
            </router-link>
          </div>

          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Your reliable</span>
                <span class="block text-green-400 xl:inline animate-pulse"> delivery partner</span>
              </h1>
              <p class="mt-3 text-base text-green-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                BroomTech offers a wide range of delivery services to meet your needs. From food delivery to package pickup and drop-off, we've got you covered.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link to="/register" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105 md:py-4 md:text-lg md:px-10">
                    Get started
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link to="/login" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-all duration-300 transform hover:scale-105 md:py-4 md:text-lg md:px-10">
                    Sign in
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <!-- Video element replacing the image - Grab-style delivery video -->
        <div class="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gray-900 relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10 z-0"></div>
          <video 
            ref="videoRef"
            class="absolute inset-0 w-full h-full object-cover filter"
            playsinline 
            preload="auto"
            loop 
            muted
            autoplay
          >
            <source 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-POb2ZvFC3XFHt2BagDAbR1nHObljsH.mp4"
              type="video/mp4"
            />
          </video>
          <!-- Overlay with gradient -->
          <div class="absolute inset-0 bg-gradient-to-r from-green-900/40 to-green-800/20 z-10"></div>
        </div>
      </div>
    </div>

    <!-- App Features Section -->
    <div class="bg-white py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Delivery made simple
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Experience the convenience of our delivery service
          </p>
        </div>

        <div class="mt-16">
          <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col items-center transform transition duration-500 hover:scale-105">
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-lg mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="mt-4 text-xl font-bold text-gray-900">Fast Delivery</h3>
              <p class="mt-2 text-base text-gray-500 text-center px-4">
                Get your items delivered quickly and efficiently, with real-time tracking.
              </p>
            </div>

            <div class="flex flex-col items-center transform transition duration-500 hover:scale-105">
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-lg mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="mt-4 text-xl font-bold text-gray-900">Secure Transactions</h3>
              <p class="mt-2 text-base text-gray-500 text-center px-4">
                Your payments and personal information are always protected.
              </p>
            </div>

            <div class="flex flex-col items-center transform transition duration-500 hover:scale-105">
              <div class="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-lg mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="mt-4 text-xl font-bold text-gray-900">Professional Riders</h3>
              <p class="mt-2 text-base text-gray-500 text-center px-4">
                Our trained delivery partners ensure your items arrive safely and on time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="py-16 lg:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">Our Services</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need, delivered
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We offer a wide range of delivery services to meet your needs.
          </p>
        </div>

        <div class="mt-16">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="(service, index) in services" :key="index" class="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <div class="p-6">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-green-500 text-white mb-5 mx-auto shadow-md">
                  <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <svg v-else-if="index === 3" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <svg v-else-if="index === 4" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <svg v-else-if="index === 5" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else-if="index === 6" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 class="text-lg leading-6 font-bold text-gray-900 text-center">{{ service.title }}</h3>
                <p class="mt-2 text-base text-gray-500 text-center">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    

    <!-- How It Works Section -->
    <div class="bg-gray-50 py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple steps to get started
          </p>
        </div>
        <div class="mt-16">
          <div class="relative">
            <!-- Connection line -->
            <div class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-green-200 transform -translate-y-1/2 z-0"></div>
            
            <div class="grid grid-cols-1 gap-12 md:grid-cols-3 relative z-10">
              <div class="relative flex flex-col items-center">
                <div class="absolute top-0 left-1/2 -ml-10 -mt-10 h-20 w-20 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg transform transition duration-500 hover:scale-110">1</div>
                <div class="bg-white rounded-xl p-8 shadow-xl mt-10 w-full transform transition duration-500 hover:shadow-2xl">
                  <h3 class="text-xl font-bold text-gray-900 mb-4 text-center">Create an account</h3>
                  <p class="text-gray-600 text-center">Sign up for free and set up your profile with your delivery preferences and payment methods.</p>
                </div>
              </div>
              <div class="relative flex flex-col items-center">
                <div class="absolute top-0 left-1/2 -ml-10 -mt-10 h-20 w-20 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg transform transition duration-500 hover:scale-110">2</div>
                <div class="bg-white rounded-xl p-8 shadow-xl mt-10 w-full transform transition duration-500 hover:shadow-2xl">
                  <h3 class="text-xl font-bold text-gray-900 mb-4 text-center">Choose a service</h3>
                  <p class="text-gray-600 text-center">Select from our wide range of delivery services and provide the necessary details for your request.</p>
                </div>
              </div>
              <div class="relative flex flex-col items-center">
                <div class="absolute top-0 left-1/2 -ml-10 -mt-10 h-20 w-20 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg transform transition duration-500 hover:scale-110">3</div>
                <div class="bg-white rounded-xl p-8 shadow-xl mt-10 w-full transform transition duration-500 hover:shadow-2xl">
                  <h3 class="text-xl font-bold text-gray-900 mb-4 text-center">Track your delivery</h3>
                  <p class="text-gray-600 text-center">Follow your delivery in real-time and receive notifications when your items are on their way and delivered.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="bg-white py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What our customers say
          </p>
        </div>
        <div class="mt-16">
          <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div class="bg-gray-50 rounded-xl p-8 shadow-xl transform transition duration-500 hover:shadow-2xl hover:scale-105">
              <div class="flex items-center mb-6">
                <div class="h-14 w-14 rounded-full bg-green-200 flex items-center justify-center">
                  <span class="text-green-700 font-bold text-xl">J</span>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium text-gray-900">John Cruz</h4>
                  <div class="flex text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 italic">"BroomTech's delivery service is incredibly fast and reliable. I use them for all my food deliveries now!"</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-8 shadow-xl transform transition duration-500 hover:shadow-2xl hover:scale-105">
              <div class="flex items-center mb-6">
                <div class="h-14 w-14 rounded-full bg-green-200 flex items-center justify-center">
                  <span class="text-green-700 font-bold text-xl">M</span>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium text-gray-900">Maria Garcia</h4>
                  <div class="flex text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 italic">"Their bill payment service saved me so much time. The delivery personnel are always professional and courteous."</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-8 shadow-xl transform transition duration-500 hover:shadow-2xl hover:scale-105">
              <div class="flex items-center mb-6">
                <div class="h-14 w-14 rounded-full bg-green-200 flex items-center justify-center">
                  <span class="text-green-700 font-bold text-xl">R</span>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium text-gray-900">Timothy De Leon</h4>
                  <div class="flex text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 italic">"I used their grocery shopping service when I was sick, and it was a lifesaver. The app is easy to use and the delivery was prompt."</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-green-500 to-green-600">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Ready to get started?</span>
          <span class="block">Create an account today.</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-green-100">
          Join thousands of satisfied customers who use BroomTech for their delivery needs.
        </p>
        <router-link to="/register" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 transition-colors duration-300 sm:w-auto">
          Sign up for free
        </router-link>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">BroomTech</h3>
            <p class="text-gray-400">Your reliable delivery partner for all your needs.</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Services</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Food Delivery</a></li>
              <li><a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Pabili Service</a></li>
              <li><a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Pay Bills</a></li>
              <li><a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Parcel Delivery</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">About Us</a></li>
              <li><a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Careers</a></li>
              <li><a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Blog</a></li>
              <li><a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Connect with us</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-green-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2023 BroomTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const videoRef = ref(null);

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play().catch(error => {
      console.log('Auto-play was prevented:', error);
    });
  }
});

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

<style>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.filter.blur-sm {
  filter: blur(4px);
}
</style>