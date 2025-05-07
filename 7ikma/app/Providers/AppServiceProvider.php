<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Cours;
use App\Models\Chapitres;
use App\Models\Lessons;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->singleton('imagekit', function ($app) {
            return new \ImageKit\ImageKit(
                env('IMAGEKIT_PUBLIC_KEY'),
                env('IMAGEKIT_PRIVATE_KEY'),
                env('IMAGEKIT_URL_ENDPOINT')
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {


        Gate::define('manage-cours', fn($user, Cours $cours) =>
        $user->utilisateur_id === $cours->prof_id
    );

    Gate::define('manage-chapitre', fn($user, Chapitres $chapitre) =>
        $user->utilisateur_id === $chapitre->cours->prof_id
    );

    Gate::define('manage-lesson', fn($user, Lessons $lesson) =>
        $user->utilisateur_id === $lesson->chapiter->cours->prof_id
    );
        Vite::prefetch(concurrency: 3);


    }
}
