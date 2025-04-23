<?php

namespace App\Http\Middleware;
use Closure;
class EnsureIsProf {
  public function handle($request, Closure $next) {
    if (auth()->user() instanceof \App\Models\Prof) {
      return $next($request);
    }
    abort(403);
  }
}
