<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ImageKitServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton('imagekit', function ($app) {
            return new \ImageKit\ImageKit(
                env('IMAGEKIT_PUBLIC_KEY'),
                env('IMAGEKIT_PRIVATE_KEY'),
                env('IMAGEKIT_URL_ENDPOINT')
            );
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
