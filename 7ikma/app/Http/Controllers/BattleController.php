<?php
namespace App\Http\Controllers;

use App\Models\Battle;
use App\Models\Devoir;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BattleController extends Controller
{
    public function create(Request $request, Devoir $devoir)
    {
        $battle = Battle::create([
            'devoir_id' => $devoir->devoir_id,
            'status'    => 'pending',
        ]);

        $quizIds = $devoir->quiz->pluck('quiz_id')->toArray();
        $battle->quizzes()->sync($quizIds);

        return response()->json($battle, 201);
    }

    public function join(Request $request, Battle $battle)
    {
        $etudiant = auth()->user();
        if ($battle->participants()->where('etudiant_id', $etudiant->id)->exists()) {
            return response()->json(['message' => 'Already joined'], 422);
        }

        $battle->participants()->attach($etudiant->id, [
            'joined_at' => now(),
            'score'     => 0,
        ]);

        if ($battle->participants()->count() >= 2) {
            $battle->update(['status' => 'active']);
        }

        return response()->json(['message' => 'Joined battle']);
    }

    public function answer(Request $request, Battle $battle, Quiz $quiz)
    {
        $user = auth()->user();
        $choiceId = $request->validate([
            'choix_id' => 'required|exists:choix,choix_id',
        ])['choix_id'];

        abort_if($battle->status !== 'active', 403, 'Battle not active');
        abort_unless($battle->participants()->where('etudiant_id', $user->id)->exists(), 403);

        $choix = $quiz->choix()->findOrFail($choiceId);
        $increment = $choix->status ? $quiz->note : 0;

        DB::transaction(function () use ($battle, $user, $increment) {
            $pivot = $battle->participants()
                            ->where('etudiant_id', $user->id)
                            ->first()
                            ->pivot;

            $newScore = $pivot->score + $increment;
            $battle->participants()->updateExistingPivot($user->id, [
                'score' => $newScore,
            ]);
        });

        return response()->json(['message' => 'Answer recorded']);
    }

    public function result(Battle $battle)
    {
        $battle->load('participants');
        $battle->update(['status' => 'completed']);

        $winner = $battle->participants
                         ->sortByDesc('pivot.score')
                         ->first();

        return response()->json([
            'participants' => $battle->participants->map(fn($p) => [
                'etudiant_id' => $p->etudiant_id,
                'score'      => $p->pivot->score,
            ]),
            'winner' => $winner->etudiant_id,
        ]);
    }
}
