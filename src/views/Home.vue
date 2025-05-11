<template>
  <div class="font-sans antialiased">
    <!-- Hero Section with Video -->
    <section class="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-lime-500 min-h-screen flex flex-col justify-center py-12 md:py-0">
      <div class="absolute inset-0 bg-pattern opacity-10"></div>
      
      <!-- Floating elements for visual interest -->
      <div class="absolute top-1/4 left-1/6 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-green-500/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-1/4 right-1/6 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-lime-500/10 rounded-full blur-2xl animate-float-delay"></div>
      
      <div class="container-fluid px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div class="grid lg:grid-cols-2 gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8 lg:gap-x-16 items-center">
          <!-- Left content - Mobile optimized -->
          <div class="order-2 lg:order-1 pt-4 lg:pt-0">
            <div class="inline-block px-3 py-1 rounded-full bg-green-200/20 text-green-100 text-xs sm:text-sm font-medium mb-3 sm:mb-6 backdrop-blur-sm shadow-inner border border-white/10">
              <span class="flex items-center">
                <span class="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-300 mr-1.5 sm:mr-2 animate-ping"></span>
                Fast & Reliable Delivery
              </span>
            </div>
            <h1 class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-white">
              <span class="block">Your reliable</span>
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-green-200 mt-1 sm:mt-2 drop-shadow-md">delivery partner</span>
            </h1>
            <div class="mt-4 sm:mt-6 h-1 w-16 sm:w-24 bg-gradient-to-r from-lime-400 to-green-300 rounded-full"></div>
            <p class="mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg md:text-xl max-w-xl leading-relaxed text-green-100">
              BroomTech offers a wide range of delivery services to meet your needs. From food delivery to package pickup and drop-off, we've got you covered.
            </p>
            
            <!-- Stats section - Mobile optimized -->
            <div class="mt-6 sm:mt-10 grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-4 max-w-md">
              <div class="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 text-center border border-white/10">
                <div class="text-base xs:text-xl sm:text-2xl font-bold text-white">24/7</div>
                <div class="text-[10px] xs:text-xs text-green-100">Service</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 text-center border border-white/10">
                <div class="text-base xs:text-xl sm:text-2xl font-bold text-white">30min</div>
                <div class="text-[10px] xs:text-xs text-green-100">Delivery</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 text-center border border-white/10">
                <div class="text-base xs:text-xl sm:text-2xl font-bold text-white">100%</div>
                <div class="text-[10px] xs:text-xs text-green-100">Satisfaction</div>
              </div>
            </div>
            
            <!-- CTA buttons - Mobile optimized -->
            <div class="mt-6 sm:mt-10 flex flex-col xs:flex-row gap-3 sm:gap-4">
              <router-link to="/register" class="flex items-center justify-center px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 border border-transparent text-sm xs:text-base font-medium rounded-lg xs:rounded-xl text-green-800 bg-gradient-to-r from-lime-400 to-green-400 hover:from-lime-300 hover:to-green-300 transition-all duration-300 transform hover:scale-105 md:py-4 md:text-lg md:px-10 shadow-lg w-full xs:w-auto">
                Get started
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5 ml-1.5 xs:ml-2 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
              <router-link to="/login" class="flex items-center justify-center px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 border border-white/20 text-sm xs:text-base font-medium rounded-lg xs:rounded-xl text-white bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm md:py-4 md:text-lg md:px-10 shadow-lg w-full xs:w-auto">
                Sign in
              </router-link>
            </div>
          </div>
          
          <!-- Video section - Mobile optimized -->
          <div class="order-1 lg:order-2 relative">
            <!-- Web Application UI Container -->
            <div class="relative w-full max-w-[280px] xxs:max-w-[340px] xs:max-w-[380px] sm:max-w-[450px] mx-auto lg:mx-0 lg:ml-auto">
              <!-- Browser-like frame -->
              <div class="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                <!-- Browser header -->
                <div class="bg-gray-100 border-b border-gray-200 px-2 xxs:px-3 xs:px-4 py-1 xxs:py-1.5 xs:py-2 flex items-center">
                  <div class="flex space-x-1 xxs:space-x-1.5 xs:space-x-2">
                    <div class="w-1.5 h-1.5 xxs:w-2 xxs:h-2 xs:w-2.5 xs:h-2.5 rounded-full bg-red-400"></div>
                    <div class="w-1.5 h-1.5 xxs:w-2 xxs:h-2 xs:w-2.5 xs:h-2.5 rounded-full bg-yellow-400"></div>
                    <div class="w-1.5 h-1.5 xxs:w-2 xxs:h-2 xs:w-2.5 xs:h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div class="mx-auto bg-white rounded-full flex items-center px-1.5 xxs:px-2 py-0.5 xxs:py-1 text-[8px] xxs:text-xxs xs:text-xs text-gray-500 border border-gray-200 w-24 xxs:w-28 xs:w-36 sm:w-48">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 xxs:h-2.5 xxs:w-2.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                    <span class="truncate">broomtech.com</span>
                  </div>
                </div>
                
                <!-- Web App Navigation -->
                <div class="bg-green-500 text-white px-2 xxs:px-3 xs:px-4 sm:px-6 py-1 xxs:py-1.5 xs:py-2 flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="font-bold text-xs xxs:text-sm xs:text-base sm:text-lg mr-1.5 xxs:mr-2 xs:mr-4 sm:mr-8">BroomTech</div>
                    <div class="hidden md:flex space-x-4 sm:space-x-6">
                      <a href="#" class="text-white hover:text-green-100 font-medium text-sm">Home</a>
                      <a href="#" class="text-green-100 hover:text-green-100 font-medium text-sm">Services</a>
                      <a href="#" class="text-green-100 hover:text-green-100 font-medium text-sm">About</a>
                      <a href="#" class="text-green-100 hover:text-green-100 font-medium text-sm">Contact</a>
                    </div>
                  </div>
                  <div class="flex items-center space-x-1.5 xxs:space-x-2 sm:space-x-4">
                    <div class="bg-white/20 rounded-full p-0.5 xxs:p-1 xs:p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 xxs:h-3 xxs:w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="bg-white/20 rounded-full p-0.5 xxs:p-1 xs:p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 xxs:h-3 xxs:w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <!-- Main content area with video -->
                <div class="relative">
                  <!-- Hero banner with video background -->
                  <div class="relative h-[160px] xxs:h-[200px] xs:h-[240px] sm:h-[280px] md:h-[300px] overflow-hidden">
                    <video 
                      ref="videoRef"
                      class="absolute inset-0 w-full h-full object-cover"
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
                      Your browser does not support the video tag.
                    </video>
                    
                    <!-- Overlay content -->
                    <div class="absolute inset-0 bg-gradient-to-r from-green-600/80 to-transparent flex items-center">
                      <div class="px-2 xxs:px-3 xs:px-4 sm:px-6 py-2 xxs:py-3 xs:py-4">
                        <h2 class="text-sm xxs:text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-0.5 xxs:mb-1 sm:mb-2 text-white">Delivery Made Easy</h2>
                        <p class="text-[8px] xxs:text-xxs xs:text-xs sm:text-sm mb-1.5 xxs:mb-2 xs:mb-3 sm:mb-4 max-w-xs text-green-100">Get anything delivered to your doorstep with just a few clicks</p>
                        <button class="bg-white text-green-600 px-1.5 xxs:px-2 xs:px-3 sm:px-4 py-0.5 xxs:py-1 xs:py-1.5 sm:py-2 rounded-md xs:rounded-lg font-medium text-[8px] xxs:text-xxs xs:text-xs sm:text-sm hover:bg-green-50 transition-colors duration-300 flex items-center">
                          Order Now
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 xxs:h-2.5 xxs:w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Service categories - Mobile optimized -->
                  <div class="bg-white p-2 xxs:p-3 xs:p-4">
                    <div class="text-center mb-1 xxs:mb-1.5 xs:mb-3">
                      <h3 class="text-gray-800 font-medium text-[10px] xxs:text-xs xs:text-sm sm:text-base">What would you like to order?</h3>
                    </div>
                    
                    <div class="grid grid-cols-4 gap-1 xxs:gap-1.5 xs:gap-2 sm:gap-3">
                      <div class="bg-gray-50 rounded-md xs:rounded-lg p-1 xxs:p-1.5 xs:p-2 sm:p-3 text-center hover:bg-green-50 hover:text-green-600 transition-colors duration-300 cursor-pointer">
                        <div class="bg-white rounded-full w-5 h-5 xxs:w-6 xxs:h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 mx-auto mb-0.5 xxs:mb-1 xs:mb-1.5 sm:mb-2 flex items-center justify-center shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 xxs:h-3 xxs:w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <span class="text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs font-medium">Food</span>
                      </div>
                      
                      <div class="bg-gray-50 rounded-md xs:rounded-lg p-1 xxs:p-1.5 xs:p-2 sm:p-3 text-center hover:bg-green-50 hover:text-green-600 transition-colors duration-300 cursor-pointer">
                        <div class="bg-white rounded-full w-5 h-5 xxs:w-6 xxs:h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 mx-auto mb-0.5 xxs:mb-1 xs:mb-1.5 sm:mb-2 flex items-center justify-center shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 xxs:h-3 xxs:w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <span class="text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs font-medium">Mart</span>
                      </div>
                      
                      <div class="bg-gray-50 rounded-md xs:rounded-lg p-1 xxs:p-1.5 xs:p-2 sm:p-3 text-center hover:bg-green-50 hover:text-green-600 transition-colors duration-300 cursor-pointer">
                        <div class="bg-white rounded-full w-5 h-5 xxs:w-6 xxs:h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 mx-auto mb-0.5 xxs:mb-1 xs:mb-1.5 sm:mb-2 flex items-center justify-center shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 xxs:h-3 xxs:w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <span class="text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs font-medium">Package</span>
                      </div>
                      
                      <div class="bg-gray-50 rounded-md xs:rounded-lg p-1 xxs:p-1.5 xs:p-2 sm:p-3 text-center hover:bg-green-50 hover:text-green-600 transition-colors duration-300 cursor-pointer">
                        <div class="bg-white rounded-full w-5 h-5 xxs:w-6 xxs:h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 mx-auto mb-0.5 xxs:mb-1 xs:mb-1.5 sm:mb-2 flex items-center justify-center shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 xxs:h-3 xxs:w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <span class="text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs font-medium">Bills</span>
                      </div>
                    </div>
                    
                    <!-- Active order card - Mobile optimized -->
                    <div class="mt-1.5 xxs:mt-2 xs:mt-3 sm:mt-6 bg-green-50 rounded-lg p-1.5 xxs:p-2 xs:p-3 sm:p-4 border border-green-100 flex items-center">
                      <div class="flex-shrink-0 bg-green-500 rounded-full p-0.5 xxs:p-1 xs:p-1.5 sm:p-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 xxs:h-2.5 xxs:w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-1.5 xxs:ml-2 xs:ml-2.5 sm:ml-3 flex-1">
                        <div class="flex justify-between items-center">
                          <h4 class="text-[8px] xxs:text-xxs xs:text-xs sm:text-sm font-medium text-gray-900">Your order is on the way!</h4>
                          <span class="text-[7px] xxs:text-[8px] xs:text-[10px] sm:text-xs text-green-600 font-medium">View</span>
                        </div>
                        <div class="mt-0.5 w-full bg-gray-200 rounded-full h-0.5 xxs:h-1 xs:h-1.5">
                          <div class="bg-green-500 h-0.5 xxs:h-1 xs:h-1.5 rounded-full" style="width: 65%"></div>
                        </div>
                        <div class="mt-0.5 flex justify-between text-[6px] xxs:text-[8px] xs:text-[10px] sm:text-xs text-gray-500">
                          <span>Estimated arrival in 15 mins</span>
                          <span>65%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Decorative elements - Hidden on very small screens -->
              <div class="absolute -top-4 -right-4 bg-yellow-400 text-yellow-800 text-[8px] xxs:text-[10px] xs:text-xs font-bold px-1 py-0.5 xxs:px-1.5 xxs:py-0.5 xs:px-2 xs:py-1 rounded-full shadow-md transform rotate-12 z-20 hidden xs:block">
                Fast Delivery
              </div>
              
              <div class="absolute -bottom-4 -left-4 bg-green-400 text-green-800 text-[8px] xxs:text-[10px] xs:text-xs font-bold px-1 py-0.5 xxs:px-1.5 xxs:py-0.5 xs:px-2 xs:py-1 rounded-full shadow-md transform -rotate-12 z-20 hidden xs:block">
                Track Orders
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Wave divider - Enhanced -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" class="w-full h-auto fill-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  
    <!-- App Features Section - Mobile optimized -->
    <section class="bg-white py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-green-50 rounded-full -mr-16 sm:-mr-24 md:-mr-32 -mt-16 sm:-mt-24 md:-mt-32 opacity-70"></div>
      <div class="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-lime-50 rounded-full -ml-16 sm:-ml-24 md:-ml-32 -mb-16 sm:-mb-24 md:-mb-32 opacity-70"></div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm">
            Why Choose Us
          </div>
          <h2 class="text-xl xs:text-2xl sm:text-3xl md:text-4xl leading-tight font-extrabold tracking-tight text-gray-900">
            Delivery made <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-500">simple</span>
          </h2>
          <div class="mt-3 sm:mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mx-auto"></div>
          <p class="mt-3 sm:mt-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-500">
            Experience the convenience of our delivery service
          </p>
        </div>
  
        <div class="mt-8 sm:mt-12 lg:mt-16">
          <div class="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div class="relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 transition duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 overflow-hidden group">
              <div class="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 to-lime-400 text-white shadow-md mb-4 sm:mb-5 md:mb-6 relative z-10 group-hover:rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 relative z-10 group-hover:text-green-600 transition-colors duration-300">Fast Delivery</h3>
              <div class="w-10 sm:w-12 h-1 bg-green-500 rounded-full my-2 sm:my-3 relative z-10 group-hover:w-16 sm:group-hover:w-20 transition-all duration-300"></div>
              <p class="mt-2 text-xs sm:text-sm md:text-base text-gray-500 relative z-10">
                Get your items delivered quickly and efficiently, with real-time tracking and updates.
              </p>
            </div>
  
            <div class="relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 transition duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 overflow-hidden group">
              <div class="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 to-lime-400 text-white shadow-md mb-4 sm:mb-5 md:mb-6 relative z-10 group-hover:rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 relative z-10 group-hover:text-green-600 transition-colors duration-300">Secure Transactions</h3>
              <div class="w-10 sm:w-12 h-1 bg-green-500 rounded-full my-2 sm:my-3 relative z-10 group-hover:w-16 sm:group-hover:w-20 transition-all duration-300"></div>
              <p class="mt-2 text-xs sm:text-sm md:text-base text-gray-500 relative z-10">
                Your payments and personal information are always protected with bank-level security.
              </p>
            </div>
  
            <div class="relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 transition duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 overflow-hidden group sm:col-span-2 lg:col-span-1">
              <div class="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 to-lime-400 text-white shadow-md mb-4 sm:mb-5 md:mb-6 relative z-10 group-hover:rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 relative z-10 group-hover:text-green-600 transition-colors duration-300">Professional Riders</h3>
              <div class="w-10 sm:w-12 h-1 bg-green-500 rounded-full my-2 sm:my-3 relative z-10 group-hover:w-16 sm:group-hover:w-20 transition-all duration-300"></div>
              <p class="mt-2 text-xs sm:text-sm md:text-base text-gray-500 relative z-10">
                Our trained delivery partners ensure your items arrive safely and on time, every time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <!-- Services Section - Mobile optimized -->
    <section class="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern opacity-5"></div>
      <!-- Decorative circles -->
      <div class="absolute top-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-green-100 rounded-full -ml-16 sm:-ml-24 md:-ml-32 -mt-16 sm:-mt-24 md:-mt-32 opacity-20"></div>
      <div class="absolute bottom-0 right-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-lime-100 rounded-full -mr-20 sm:-mr-30 md:-mr-40 -mb-20 sm:-mb-30 md:-mb-40 opacity-20"></div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm">
            Our Services
          </div>
          <h2 class="text-xl xs:text-2xl sm:text-3xl md:text-4xl leading-tight font-extrabold tracking-tight text-gray-900">
            Everything you need, <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-500">delivered</span>
          </h2>
          <div class="mt-3 sm:mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mx-auto"></div>
          <p class="mt-3 sm:mt-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-500">
            We offer a wide range of delivery services to meet your needs.
          </p>
        </div>
  
        <div class="mt-8 sm:mt-12 lg:mt-16">
          <div class="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 lg:grid-cols-4">
            <div v-for="(service, index) in services" :key="index" class="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden transform transition duration-500 hover:-translate-y-2 hover:shadow-xl group">
              <div class="h-1.5 sm:h-2 bg-gradient-to-r from-green-500 to-lime-400"></div>
              <div class="p-3 xs:p-4 sm:p-6">
                <div class="flex items-center justify-center h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-xl sm:rounded-2xl bg-green-50 text-green-600 mb-3 sm:mb-4 md:mb-6 mx-auto shadow-sm group-hover:bg-green-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                  <svg v-if="index === 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <svg v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <svg v-else-if="index === 2" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <svg v-else-if="index === 3" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <svg v-else-if="index === 4" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <svg v-else-if="index === 5" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg v-else-if="index === 6" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 class="text-xs xs:text-sm sm:text-base md:text-lg leading-6 font-bold text-gray-900 text-center group-hover:text-green-600 transition-colors duration-300">{{ service.title }}</h3>
                <p class="mt-1.5 sm:mt-2 md:mt-3 text-[10px] xs:text-xs sm:text-sm text-gray-500 text-center line-clamp-3">{{ service.description }}</p>
                <div class="mt-2 sm:mt-3 md:mt-4 text-center">
                  <a href="#" class="inline-flex items-center text-green-600 hover:text-green-800 text-[10px] xs:text-xs sm:text-sm font-medium group">
                    Learn more 
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <!-- How It Works Section - Mobile optimized -->
    <section class="bg-white py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute left-0 top-1/4 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-green-50 rounded-full -ml-8 sm:-ml-12 md:-ml-16 opacity-70"></div>
      <div class="absolute right-0 bottom-1/4 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-lime-50 rounded-full -mr-12 sm:-mr-18 md:-mr-24 opacity-70"></div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm">
            How It Works
          </div>
          <h2 class="text-xl xs:text-2xl sm:text-3xl md:text-4xl leading-tight font-extrabold tracking-tight text-gray-900">
            Simple steps to <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-500">get started</span>
          </h2>
          <div class="mt-3 sm:mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mx-auto"></div>
        </div>
        <div class="mt-8 sm:mt-12 lg:mt-16">
          <div class="relative">
            <!-- Connection line - Hidden on mobile, visible on md screens -->
            <div class="hidden md:block absolute top-24 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-lime-300 z-0"></div>
            
            <div class="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 md:grid-cols-3 relative z-10">
              <div class="relative flex flex-col items-center">
                <div class="flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-lime-400 text-white text-lg sm:text-xl font-bold shadow-lg">1</div>
                <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mt-4 sm:mt-6 md:mt-8 w-full transform transition duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-green-200">
                  <h3 class="text-sm xs:text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 text-center">Create an account</h3>
                  <p class="text-gray-600 text-center text-[10px] xs:text-xs sm:text-sm">Sign up for free and set up your profile with your delivery preferences and payment methods.</p>
                </div>
              </div>
              <div class="relative flex flex-col items-center">
                <div class="flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-lime-400 text-white text-lg sm:text-xl font-bold shadow-lg">2</div>
                <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mt-4 sm:mt-6 md:mt-8 w-full transform transition duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-green-200">
                  <h3 class="text-sm xs:text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 text-center">Choose a service</h3>
                  <p class="text-gray-600 text-center text-[10px] xs:text-xs sm:text-sm">Select from our wide range of delivery services and provide the necessary details for your request.</p>
                </div>
              </div>
              <div class="relative flex flex-col items-center">
                <div class="flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-lime-400 text-white text-lg sm:text-xl font-bold shadow-lg">3</div>
                <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mt-4 sm:mt-6 md:mt-8 w-full transform transition duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-green-200">
                  <h3 class="text-sm xs:text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 text-center">Track your delivery</h3>
                  <p class="text-gray-600 text-center text-[10px] xs:text-xs sm:text-sm">Follow your delivery in real-time and receive notifications when your items are on their way and delivered.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <!-- Testimonials Section - Mobile optimized -->
    <section class="bg-gray-50 py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern opacity-5"></div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm">
            Testimonials
          </div>
          <h2 class="text-xl xs:text-2xl sm:text-3xl md:text-4xl leading-tight font-extrabold tracking-tight text-gray-900">
            What our <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-500">customers say</span>
          </h2>
          <div class="mt-3 sm:mt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-green-400 to-lime-500 rounded-full mx-auto"></div>
        </div>
        <div class="mt-8 sm:mt-12 lg:mt-16">
          <div class="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 md:grid-cols-3">
            <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-100 relative">
              <div class="absolute top-0 right-0 transform -translate-y-1/3 translate-x-1/4">
                <div class="text-green-100 opacity-80" style="font-size: 70px; line-height: 1;">"</div>
              </div>
              <div class="flex items-center mb-3 sm:mb-4 md:mb-6 relative z-10">
                <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-700 font-bold text-sm sm:text-base md:text-lg">J</span>
                </div>
                <div class="ml-2 sm:ml-3 md:ml-4">
                  <h4 class="text-xs sm:text-sm md:text-base font-medium text-gray-900">John Cruz</h4>
                  <div class="flex text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 italic text-[10px] xs:text-xs sm:text-sm relative z-10">"BroomTech's delivery service is incredibly fast and reliable. I use them for all my food deliveries now! Their app is intuitive and the tracking feature is spot on."</p>
              <div class="mt-3 sm:mt-4 md:mt-6 flex justify-end">
                <div class="h-1 w-8 sm:w-12 md:w-16 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-100 relative">
              <div class="absolute top-0 right-0 transform -translate-y-1/3 translate-x-1/4">
                <div class="text-green-100 opacity-80" style="font-size: 70px; line-height: 1;">"</div>
              </div>
              <div class="flex items-center mb-3 sm:mb-4 md:mb-6 relative z-10">
                <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-700 font-bold text-sm sm:text-base md:text-lg">M</span>
                </div>
                <div class="ml-2 sm:ml-3 md:ml-4">
                  <h4 class="text-xs sm:text-sm md:text-base font-medium text-gray-900">Maria Garcia</h4>
                  <div class="flex text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 italic text-[10px] xs:text-xs sm:text-sm relative z-10">"Their bill payment service saved me so much time. The delivery personnel are always professional and courteous. I recommend BroomTech to all my friends!"</p>
              <div class="mt-3 sm:mt-4 md:mt-6 flex justify-end">
                <div class="h-1 w-8 sm:w-12 md:w-16 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-100 relative">
              <div class="absolute top-0 right-0 transform -translate-y-1/3 translate-x-1/4">
                <div class="text-green-100 opacity-80" style="font-size: 70px; line-height: 1;">"</div>
              </div>
              <div class="flex items-center mb-3 sm:mb-4 md:mb-6 relative z-10">
                <div class="h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 rounded-full bg-green-100 flex items-center justify-center">
                  <span class="text-green-700 font-bold text-sm sm:text-base md:text-lg">T</span>
                </div>
                <div class="ml-2 sm:ml-3 md:ml-4">
                  <h4 class="text-xs sm:text-sm md:text-base font-medium text-gray-900">Timothy De Leon</h4>
                  <div class="flex text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p class="text-gray-600 italic text-[10px] xs:text-xs sm:text-sm relative z-10">"I used their grocery shopping service when I was sick, and it was a lifesaver. The app is easy to use and the delivery was prompt. Their customer service is exceptional!"</p>
              <div class="mt-3 sm:mt-4 md:mt-6 flex justify-end">
                <div class="h-1 w-8 sm:w-12 md:w-16 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <!-- CTA Section - Mobile optimized -->
    <section class="bg-gradient-to-br from-green-600 to-lime-600 relative overflow-hidden">
      <div class="absolute inset-0 bg-pattern opacity-10"></div>
      <!-- Decorative shapes -->
      <div class="absolute left-0 top-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-white/5 rounded-full -ml-16 sm:-ml-24 md:-ml-32 -mt-16 sm:-mt-24 md:-mt-32"></div>
      <div class="absolute right-0 bottom-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-white/5 rounded-full -mr-16 sm:-mr-24 md:-mr-32 -mb-16 sm:-mb-24 md:-mb-32"></div>
      
      <div class="container mx-auto text-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <h2 class="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
          <span class="block">Ready to get started?</span>
          <span class="block mt-1 sm:mt-2">Create an account today.</span>
        </h2>
        <div class="mt-3 sm:mt-4 h-1 w-16 sm:w-20 bg-white/30 rounded-full mx-auto"></div>
        <p class="mt-3 sm:mt-4 md:mt-6 text-sm xs:text-base sm:text-lg leading-6 text-green-100">
          Join thousands of satisfied customers who use BroomTech for their delivery needs.
        </p>
        <div class="mt-6 sm:mt-8 md:mt-10 flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 md:gap-6">
          <router-link to="/register" class="inline-flex items-center justify-center px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-4 border border-transparent text-sm xs:text-base font-medium rounded-lg text-green-600 bg-white hover:bg-gray-50 transition-colors duration-300 shadow-lg w-full xs:w-auto">
            Sign up for free
          </router-link>
          <router-link to="/contact" class="inline-flex items-center justify-center px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-4 border border-white text-sm xs:text-base font-medium rounded-lg text-white hover:bg-green-500 transition-colors duration-300 shadow-lg w-full xs:w-auto">
            Contact us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
  
const videoRef = ref(null);
  
onMounted(() => {
  // Force video play on desktop
  if (videoRef.value) {
    const playPromise = videoRef.value.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log('Video playback started successfully');
      }).catch(error => {
        console.log('Auto-play was prevented:', error);
        // Try to play again with user interaction
        document.addEventListener('click', () => {
          videoRef.value.play();
        }, { once: true });
      });
    }
  }
});
  
function playVideo() {
  if (videoRef.value) {
    videoRef.value.play();
  }
}
  
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
  
.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
  
@keyframes ping {
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
  
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
  
@keyframes float-delay {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
  
.animate-float {
  animation: float 6s ease-in-out infinite;
}
  
.animate-float-delay {
  animation: float-delay 8s ease-in-out infinite;
}
  
.filter.blur-sm {
  filter: blur(4px);
}
  
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
  
/* Custom container classes */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 1280px;
}
  
.container-fluid {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
  
/* Custom section spacing */
.py-section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
  
@media (min-width: 640px) {
  .py-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}
  
@media (min-width: 768px) {
  .py-section {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
}
  
@media (min-width: 1024px) {
  .py-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}
  
.py-section-sm {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
  
@media (min-width: 640px) {
  .py-section-sm {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
  
@media (min-width: 768px) {
  .py-section-sm {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}
  
/* Extra small screens - For very small mobile devices */
@media (min-width: 360px) {
  .xxs\:max-w-\[340px\] {
    max-width: 340px;
  }
  .xxs\:px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .xxs\:py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .xxs\:h-\[200px\] {
    height: 200px;
  }
  /* Other xxs-specific classes */
  .text-xxs {
    font-size: 0.65rem;
    line-height: 1rem;
  }
}
  
@media (min-width: 400px) {
  .xs\:max-w-\[380px\] {
    max-width: 380px;
  }
  .xs\:px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .xs\:px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .xs\:h-\[240px\] {
    height: 240px;
  }
  /* Other xs-specific classes */
}
  
/* Media queries for better responsiveness */
@media (max-width: 640px) {
  .text-4xl {
    font-size: 2.25rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
  }
}
  
/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .bg-white {
    background-color: #1a1a1a;
  }
  
  .text-gray-900 {
    color: #f3f4f6;
  }
  
  .text-gray-500 {
    color: #d1d5db;
  }
  
  .border-gray-100 {
    border-color: #374151;
  }
}
  
/* Improved video loading and transitions */
.video-loaded {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
  
.video-loading {
  opacity: 0.7;
}
  
/* Line clamp utility with vendor prefixes */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
</style>