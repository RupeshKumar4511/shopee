import React from 'react'

const Hero = () => {
    return (
        <section class="bg-gray-500/10 py-16 lg:py-24">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <div class="max-w-xl">
                        <span class="inline-block rounded-full bg-gray-900/5 px-3.5 py-1 text-sm font-medium text-gray-700">
                            New Season Arrivals
                        </span>

                        <h1 class="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Everyday essentials, built to last.
                        </h1>

                        <p class="mt-6 text-lg leading-relaxed text-gray-600">
                            Upgrade your daily routine with thoughtfully designed accessories, carry goods, and home staples crafted from sustainable materials.
                        </p>

                       

                        <div class="mt-10 flex items-center gap-6 border-t border-gray-200 pt-6 text-sm text-gray-500">
                            <div class="flex items-center gap-2">
                                <span class="font-semibold text-gray-900">Free Shipping</span> on orders over ₹999
                            </div>
                            <div class="h-4 w-px bg-gray-300"></div>
                            <div class="flex items-center gap-2">
                                {/* <span class="font-semibold text-gray-900">7-Day</span> easy returns */}
                            </div>
                        </div>
                    </div>

                    <div class="relative">
                        <div class="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5">
                            <img
                                src="https://images.unsplash.com/photo-1739169585918-84f6fba6c6f7"
                                alt="Minimalist daily essentials flatlay including watch, sunglasses, and everyday carry items"
                                class="h-[420px] w-full object-cover sm:h-[500px]"
                            />
                        </div>

                    </div>

                </div>
            </div>
        </section>

    )
}

export default Hero
