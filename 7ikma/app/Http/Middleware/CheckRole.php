<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Etudiant;
use App\Models\Prof;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        if ($role === 'etudiant' && !($user instanceof Etudiant)) {
            return response()->json(['message' => 'Unauthorized. Etudiant role required.'], 403);
        }

        if ($role === 'prof' && !($user instanceof Prof)) {
            return response()->json(['message' => 'Unauthorized. Prof role required.'], 403);
        }

        return $next($request);
    }
}
