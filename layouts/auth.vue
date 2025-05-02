<template>
  <div class="min-h-screen w-full bg-blue-50 relative overflow-hidden">
    <!-- Left spiral ribbon -->
    <div class="absolute left-0 bottom-0  md:h-96 opacity-20">
      <svg width="293" height="551" viewBox="0 0 293 551" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17.5" cy="275.5" r="275" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="17.5" cy="275.5" r="275" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-134.5" cy="248.5" r="158" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-134.5" cy="248.5" r="158" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="3.07797" cy="272.938" r="263.899" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-11.2233" cy="270.397" r="252.891" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-25.4042" cy="267.879" r="241.975" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-39.4638" cy="265.381" r="231.153" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-53.4026" cy="262.905" r="220.424" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-67.2211" cy="260.451" r="209.787" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-80.9183" cy="258.018" r="199.244" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-94.4947" cy="255.606" r="188.793" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-107.951" cy="253.216" r="178.436" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="-121.286" cy="250.847" r="168.171" stroke="#0000FF" stroke-opacity="0.25"/>
      </svg>
    </div>
    
    <!-- Right spiral ribbon -->
    <div class="absolute right-0 bottom-0  md:h-96 opacity-20">
      <svg width="336" height="347" viewBox="0 0 336 347" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="319.171" cy="325.25" r="275" transform="rotate(169.996 319.171 325.25)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="319.171" cy="325.25" r="275" transform="rotate(169.996 319.171 325.25)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="473.55" cy="325.434" r="158" transform="rotate(169.996 473.55 325.434)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="473.55" cy="325.434" r="158" transform="rotate(169.996 473.55 325.434)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="333.819" cy="325.268" r="263.899" transform="rotate(169.996 333.819 325.268)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="348.343" cy="325.285" r="252.891" transform="rotate(169.996 348.343 325.285)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="362.747" cy="325.302" r="241.975" transform="rotate(169.996 362.747 325.302)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="377.026" cy="325.319" r="231.153" transform="rotate(169.996 377.026 325.319)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="391.183" cy="325.336" r="220.424" transform="rotate(169.996 391.183 325.336)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="405.218" cy="325.353" r="209.787" transform="rotate(169.996 405.218 325.353)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="419.129" cy="325.369" r="199.244" transform="rotate(169.996 419.129 325.369)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="432.918" cy="325.386" r="188.793" transform="rotate(169.996 432.918 325.386)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="446.585" cy="325.402" r="178.436" transform="rotate(169.996 446.585 325.402)" stroke="#0000FF" stroke-opacity="0.25"/>
      <circle cx="460.129" cy="325.419" r="168.171" transform="rotate(169.996 460.129 325.419)" stroke="#0000FF" stroke-opacity="0.25"/>
      </svg>
    </div>
    
    <!-- Logo in top left -->
    <div class="absolute top-6 left-12">
      <img src="@/assets/icons/trade-logo.svg" alt="DeSmart Trader" class="h-16" />
    </div>
    
    <!-- Content slot with improved width -->
    <div class="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <slot />
    </div>
  </div>
</template>