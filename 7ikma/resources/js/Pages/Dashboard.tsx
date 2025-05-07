import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Leaderboard from './pages/leaderboard';
import Rate from '@/Components/rate';
import GamePlatform from '@/Components/gamesection';
import { Book, Brain, ChartPie, Check, ChevronRight, Clock, MessageSquare, Star, Users, X } from 'lucide-react';
import DashboardPage from './pages/dashboard';
import CoursePage from './pages/courses';
import MathQuiz from './pages/quize';

export default function Dashboard() {


    return (
        <AuthenticatedLayout
            pages={[<DashboardPage></DashboardPage>,<CoursePage></CoursePage>]}
        >

        </AuthenticatedLayout>
    );
}
